import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { authClient } from "#/lib/better-auth/client";

const Dashboard = () => {
	const router = useRouter();
	const [isSignoutLoading, setIsSignoutLoading] = useState(false);
	const handleSignout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onRequest: () => {
					setIsSignoutLoading(true);
				},
				onResponse: () => {
					setIsSignoutLoading(false);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					router.navigate({ href: "/signin" });
				},
			},
		});
	};
	return (
		<div className="flex justify-center items-center gap-2">
			<Button onClick={handleSignout} disabled={isSignoutLoading}>
				{isSignoutLoading && <Spinner />}
				Logout
			</Button>
		</div>
	);
};

export const Route = createFileRoute("/(app)/")({ component: Dashboard });
