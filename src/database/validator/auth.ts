import { createSchemaFactory } from "drizzle-orm/zod";
import { z } from "zod";
import { account, session, user } from "../schema";

const { createInsertSchema, createSelectSchema } = createSchemaFactory({
	zodInstance: z,
});

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;

export const insertSessionSchema = createInsertSchema(session);
export const selectSessionSchema = createSelectSchema(session);
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type SelectSession = z.infer<typeof selectSessionSchema>;

export const insertAccountSchema = createInsertSchema(account);
export const selectAccountSchema = createSelectSchema(account);
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type SelectAccount = z.infer<typeof selectAccountSchema>;

const authBase = insertUserSchema
	.pick({
		email: true,
	})
	.extend({
		email: z.email(),
		password: z.string().min(8),
	});

export const signInSchema = authBase;
export const signUpSchema = authBase.extend({
	name: insertUserSchema.shape.name,
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInDefaults: SignInSchema = { email: "", password: "" };
export const signUpDefaults: SignUpSchema = {
	name: "",
	email: "",
	password: "",
};
