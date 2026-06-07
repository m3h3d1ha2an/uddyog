import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
	beforeLoad: async () => {
		// const session = await getSession();
		// if (session) throw redirect({ to: "/dashboard" });
	},
	component: () => (
		<main className="flex justify-center items-center border border-gray-200 m-4 rounded-2xl min-h-176 xl:min-h-174">
			<Outlet />
		</main>
	),
});
