import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
	component: SignUpPage,
});

function SignUpPage() {
	return (
		<div className="flex justify-center items-center border border-gray-200 m-4 rounded-2xl min-h-176">
			SignUp
		</div>
	);
}
