import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { relations } from "./relations";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

const client = postgres(process.env.DATABASE_URL, {
	max: 10, // keep connection count reasonable
	idle_timeout: 20, // close idle connections after 20s
	connect_timeout: 10, // connection timeout
	ssl: { rejectUnauthorized: false }, // Supabase SSL
});

export const db = drizzle({ client, relations });
