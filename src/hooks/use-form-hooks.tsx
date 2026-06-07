import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { formContext, useFormContext } = createFormHookContexts();
const { fieldContext, useFieldContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {},
	formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
