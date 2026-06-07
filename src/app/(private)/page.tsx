import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "#/components/theme-toggle";

const Dashboard = () => {
	return <ThemeToggle />;
};

export const Route = createFileRoute("/(private)/")({ component: Dashboard });
