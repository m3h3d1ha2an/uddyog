import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
	component: SignInPage,
});

function SignInPage() {
	return (
		<div className="flex justify-center items-center border border-gray-200 m-4 rounded-2xl min-h-176">
			SignIn
		</div>
	);
}
