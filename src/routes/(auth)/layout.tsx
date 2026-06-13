import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "#/lib/better-auth/functions";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async () => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: "/" });
		}
	},
	component: () => (
		<main className="min-h-dvh flex flex-col items-center justify-center bg-slate-50">
			<Outlet />
		</main>
	),
});
