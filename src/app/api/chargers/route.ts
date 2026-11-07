import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const supabase = getSupabaseAdmin();

    const { searchParams } = new URL(req.url);
    const area = searchParams.get("area");

    let query = supabase
      .from("chargers")
      .select("*");

    if (area) {
      query = query.ilike("address", `%${area}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unable to load chargers:", error);

    return NextResponse.json(
      { error: "Unable to load chargers" },
      { status: 500 }
    );
  }
}