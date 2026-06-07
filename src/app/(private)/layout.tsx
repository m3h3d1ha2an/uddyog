import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "#/lib/better-auth/functions";

export const Route = createFileRoute("/(private)")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();
		if (!session) {
			throw redirect({
				to: "/auth/signin",
				search: { redirect: location.href },
			});
		}
		return { user: session.user };
	},
	component: () => (
		<main className="flex justify-center items-center border border-gray-200 m-4 rounded-2xl min-h-176 xl:min-h-174">
			<Outlet />
		</main>
	),
});
