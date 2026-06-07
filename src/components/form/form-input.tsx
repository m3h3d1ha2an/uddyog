import { Eye, EyeOff } from "lucide-react";
import { Activity, useState } from "react";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "#/components/ui/input-group";
import { useFieldContext } from "#/hooks/use-form-hooks";
import { cn } from "#/lib/utils";

type FormInputProps = {
	label: string;
	description?: string;
	type?: React.HTMLInputTypeAttribute;
};

export const FormInput = ({ label, description, type }: FormInputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name} className="text-base">
				{label}
			</FieldLabel>
			<Activity mode={description ? "visible" : "hidden"}>
				<FieldDescription className="text-sm">{description}</FieldDescription>
			</Activity>
			<InputGroup>
				<InputGroupInput
					id={field.name}
					name={field.name}
					type={
						type === "password" ? (showPassword ? "text" : "password") : type
					}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.target.value)}
					aria-invalid={isInvalid}
					className={cn(
						type === "password"
							? showPassword
								? "text-sm!"
								: "text-xl!"
							: "text-sm!",
					)}
				/>
				<Activity mode={type === "password" ? "visible" : "hidden"}>
					<InputGroupAddon align="inline-end">
						<InputGroupButton onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <EyeOff /> : <Eye />}
						</InputGroupButton>
					</InputGroupAddon>
				</Activity>
			</InputGroup>
			<Activity mode={isInvalid ? "visible" : "hidden"}>
				<FieldError errors={field.state.meta.errors} />
			</Activity>
		</Field>
	);
};
