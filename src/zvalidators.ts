import { z } from 'zod'

export const userSchema = z.object({
    name: z.string(),
    contact_phone: z.string(),
    phone_verified:z.boolean(),
    email: z.string(),
    email_verified: z.boolean(),
    confirmation_code:z.string(),
    password: z.string(),
    role: z.string(),
    // created_at: z.date()
    // updated_at: z.date()
})