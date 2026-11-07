import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { bookingSchema } from '@/lib/validation';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
 try {
    const parsed = bookingSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const value = parsed.data;
    const supabase = getSupabaseAdmin();
    const { data: charger, error: chargerError } = await supabase
      .from('chargers')
      .select('id, status, pricing_type, price, charging_power')
      .eq('id', value.chargerId)
      .maybeSingle();

    if (chargerError) throw chargerError;
    if (!charger || charger.status !== 'ACTIVE') return NextResponse.json({ error: 'Charger unavailable' }, { status: 404 });

    const { data: conflict, error: conflictError } = await supabase
      .from('bookings')
      .select('id')
      .eq('charger_id', value.chargerId)
      .in('booking_status', ['PENDING', 'CONFIRMED', 'IN_PROGRESS'])
      .lt('start_time', value.endTime.toISOString())
      .gt('end_time', value.startTime.toISOString())
      .limit(1)
      .maybeSingle();

    if (conflictError) throw conflictError;
    if (conflict) return NextResponse.json({ error: 'This time slot overlaps another booking' }, { status: 409 });

    const hours = (value.endTime.getTime() - value.startTime.getTime()) / 3_600_000;
    const totalAmount = charger.pricing_type === 'PER_HOUR'
      ? charger.price * hours
      : charger.price * hours * charger.charging_power;
    const platformFee = totalAmount * Number(process.env.PLATFORM_COMMISSION ?? 0.15);
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        booking_code: `CS-${randomBytes(4).toString('hex').toUpperCase()}`,
        driver_id: value.driverId,
        charger_id: value.chargerId,
        start_time: value.startTime.toISOString(),
        end_time: value.endTime.toISOString(),
        ev_model: value.evModel,
        total_amount: totalAmount,
        platform_fee: platformFee,
        host_earnings: totalAmount - platformFee,
      })
      .select()
      .single();

    if (insertError) throw insertError;
    return NextResponse.json({ booking, paymentMode: process.env.PAYMENT_MODE ?? 'mock' }, { status: 201 });
  } catch (error) {
    console.error('Unable to create booking', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
