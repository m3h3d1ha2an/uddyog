import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "#/components/layout/app-sidebar";
import { AppTopbar } from "#/components/layout/app-topbar";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { getSession } from "#/lib/better-auth/functions";

export const Route = createFileRoute("/(app)")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();
		if (!session) {
			throw redirect({
				to: "/signin",
				search: { redirect: location.href },
			});
		}
		return { user: session.user };
	},
	component: () => (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<AppTopbar />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<Outlet />
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	),
});
