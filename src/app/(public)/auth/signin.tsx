import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthCard } from "#/components/auth-card";
import { Button } from "#/components/ui/button";
import { FieldGroup } from "#/components/ui/field";
import { Spinner } from "#/components/ui/spinner";
import { signInSchema } from "#/database/validator";
import { useAppForm } from "#/hooks/use-form-hooks";
import { authClient } from "#/lib/better-auth/client";

export const Route = createFileRoute("/(public)/auth/signin")({
	component: SignInPage,
});

function SignInPage() {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: { onSubmit: signInSchema },
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						router.navigate({ to: "/" });
					},
					onError: (ctx) => {
						toast.error(ctx.error.message ?? "Something went wrong");
					},
				},
			);
		},
	});
	return (
		<AuthCard
			title="Welcome back!"
			description="Sign in to your account to continue."
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.AppField name="email">
						{(field) => <field.Input label="Email" type="email" />}
					</form.AppField>
					<form.AppField name="password">
						{(field) => <field.Input label="Password" type="password" />}
					</form.AppField>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button type="submit" className="text-base" disabled={!canSubmit}>
								{isSubmitting && <Spinner />}
								Sign In
							</Button>
						)}
					</form.Subscribe>
					<Button
						className="text-base"
						variant="outline"
						type="button"
						onClick={async () => {
							await authClient.signIn.anonymous(
								{},
								{
									onSuccess: () => {
										router.navigate({ to: "/" });
									},
									onError: (ctx) => {
										toast.error(ctx.error.message ?? "Something went wrong");
									},
								},
							);
						}}
					>
						Continue as Guest
					</Button>

					<div className="flex items-center justify-center text-sm">
						Don't have an account?
						<Link to="/auth/signup">
							<Button type="button" variant="link" className="text-sm">
								Sign Up
							</Button>
						</Link>
					</div>
				</FieldGroup>
			</form>
		</AuthCard>
	);
}
