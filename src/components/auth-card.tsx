import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
};

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
	return (
		<Card className="relative w-full max-w-sm overflow-hidden">
			<CardHeader className="text-center">
				<img
					alt="Logo"
					height={50}
					src="/logo512.png"
					width={50}
					className="mx-auto mb-2"
				/>
				<CardTitle className="text-lg md:text-xl">{title}</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};
