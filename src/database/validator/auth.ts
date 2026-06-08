import { createInsertSchema } from "drizzle-orm/zod";
import { z } from "zod";
import { emailSchema } from "#/lib/zod-helpers/email-schema";
import { nameSchema } from "#/lib/zod-helpers/name-schema";
import { passwordSchema } from "#/lib/zod-helpers/pswd-schema";
import { user } from "../schema";

export const insertUserSchema = createInsertSchema(user);

export const signInSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const signUpSchema = signInSchema.extend({
	name: nameSchema,
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
