import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "#/components/auth-card";
import { Button } from "#/components/ui/button";
import { FieldGroup } from "#/components/ui/field";
import { Spinner } from "#/components/ui/spinner";
import { useAppForm } from "#/hooks/use-form-hooks";

export const Route = createFileRoute("/(public)/auth/signup")({
	component: SignUpPage,
});

function SignUpPage() {
	const form = useAppForm({});
	return (
		<AuthCard
			title="Get Started"
			description="Enter your information below to signup."
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.AppField name="name">
						{(field) => <field.Input label="Name" />}
					</form.AppField>
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
								Create Account
							</Button>
						)}
					</form.Subscribe>
					<div className="flex items-center justify-center text-sm">
						Already have an account?
						<Link to="/auth/signin">
							<Button type="button" variant="link" className="text-sm">
								Signin
							</Button>
						</Link>
					</div>
				</FieldGroup>
			</form>
		</AuthCard>
	);
}
