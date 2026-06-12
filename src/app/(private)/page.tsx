import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/better-auth/client";

const Dashboard = () => {
	const router = useRouter();
	const handleSignout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					router.navigate({ href: "/auth/signin" });
				},
			},
		});
	};
	return (
		<div className="flex justify-center items-center gap-2">
			<Button onClick={handleSignout}>Logout</Button>
		</div>
	);
};

export const Route = createFileRoute("/(private)/")({ component: Dashboard });
