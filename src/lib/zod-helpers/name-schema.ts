import z from "zod";

export const nameSchema = z
	.string()
	.trim()
	.min(2, "Name must be at least 2 characters long")
	.max(100, "Name must be at most 100 characters long");
