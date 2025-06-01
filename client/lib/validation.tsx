"use client"

import { z } from "zod"
import { fi } from "zod/v4/locales"

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export const oldEmailSchema = z.object({
  oldEmail: z.string().email({
    message: "Please enter a valid email address",
  }),
}).merge(formSchema)

export const messageSchema = z.object({
  text: z.string().min(1, {
    message: "Message cannot be empty",
  }),
  image: z.string().optional(),
})

export const profileSchema = z.object({
  firstName: z.string().min(2,),
  lastName: z.string().optional(),
  bio: z.string().optional(),
})

export const confirmTextSchema = z.object({
  confirmText: z
    .string()
    .min(1, { message: "Field is required." }) // чтобы поле не было пустым
    .refine((val) => val === "DELETE", {
      message: "You must type 'DELETE' to confirm.",
    }),
})

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export const OtpSchema = formSchema.merge(otpSchema)
