import { z } from 'zod';
export const bookingSchema = z.object({
 driverId:z.string().min(1), chargerId:z.string().min(1),
 startTime:z.coerce.date(), endTime:z.coerce.date(),
 evModel:z.string().max(100).optional()
}).refine(v=>v.endTime>v.startTime,{message:'End time must be after start time'});
