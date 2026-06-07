import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthCard } from "#/components/auth-card";
import { Button } from "#/components/ui/button";
import { FieldGroup } from "#/components/ui/field";
import { Spinner } from "#/components/ui/spinner";
import { signInDefaults, signInSchema } from "#/database/validator";
import { useAppForm } from "#/hooks/use-form-hooks";
import { authClient } from "#/lib/better-auth/client";

export const Route = createFileRoute("/(public)/auth/signin")({
	component: SignInPage,
});

function SignInPage() {
	const form = useAppForm({
		defaultValues: signInDefaults,
		validators: { onSubmit: signInSchema },
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						redirect({ to: "/" });
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
			description="Enter your credentials below to signin."
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
					{/*<Field orientation="horizontal">
						<form.AppField name="rememberMe">
							{(field) => <field.Checkbox label="Remember me" horizontal />}
						</form.AppField>
						<Link to="/auth/signin">
							<Button type="button" variant="link" className="text-sm">
								Forgot password?
							</Button>
						</Link>
					</Field>*/}
					<Button>Guest Signin</Button>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button type="submit" className="text-base" disabled={!canSubmit}>
								{isSubmitting && <Spinner />}
								Signin
							</Button>
						)}
					</form.Subscribe>
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
