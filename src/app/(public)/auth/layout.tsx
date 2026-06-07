import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth")({
	beforeLoad: async () => {
		// const session = await getSession();
		// if (session) throw redirect({ to: "/dashboard" });
	},
	component: () => (
		<main className="min-h-dvh flex flex-col items-center justify-center">
			<Outlet />
		</main>
	),
});
