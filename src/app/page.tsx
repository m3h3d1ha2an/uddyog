import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "#/components/theme-toggle";

const App = () => {
	return (
		<main className="flex justify-center items-center border border-gray-200 m-4 rounded-2xl min-h-176">
			<ThemeToggle />
		</main>
	);
};

export const Route = createFileRoute("/")({ component: App });
