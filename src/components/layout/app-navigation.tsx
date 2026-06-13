import { Link, useRouterState } from "@tanstack/react-router";
import {
	ActivityIcon,
	ChevronRightIcon,
	FolderKanbanIcon,
	GanttChartIcon,
	LayoutDashboardIcon,
	ListTodoIcon,
	PlusIcon,
	TableIcon,
} from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "#/components/ui/sidebar";

// --- Types ---

type NavSubItem = {
	title: string;
	url: string;
	icon: React.ElementType;
};

// Named types for each shape — avoids Extract<> narrowing issues
type SingleNavItemType = {
	title: string;
	url: string;
	icon: React.ElementType;
	items?: never;
};

type CollapsibleNavItemType = {
	title: string;
	url?: never;
	icon: React.ElementType;
	items: NavSubItem[];
};

type NavItem = SingleNavItemType | CollapsibleNavItemType;

// --- Static data ---

const navigation: NavItem[] = [
	{
		title: "Dashboard",
		url: "/",
		icon: LayoutDashboardIcon,
	},
	{
		title: "Projects",
		icon: FolderKanbanIcon,
		items: [
			{ title: "Create Project", url: "/projects/new", icon: PlusIcon },
			{ title: "Project List", url: "/projects", icon: TableIcon },
		],
	},
	{
		title: "Tasks",
		icon: ListTodoIcon,
		items: [
			{ title: "Create Task", url: "/tasks/new", icon: PlusIcon },
			{ title: "Task List", url: "/tasks", icon: GanttChartIcon },
		],
	},
	{
		title: "Activity Log",
		url: "/activity",
		icon: ActivityIcon,
	},
];

// --- Sub-components ---

const SingleNavItem = ({
	item,
	isActive,
}: { item: SingleNavItemType; isActive: boolean }) => (
	<SidebarMenuItem>
		<SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
			<Link to={item.url}>
				<item.icon />
				<span>{item.title}</span>
			</Link>
		</SidebarMenuButton>
	</SidebarMenuItem>
);

const CollapsibleNavItem = ({
	item,
	isActive,
	pathname,
}: {
	item: CollapsibleNavItemType;
	isActive: boolean;
	pathname: string;
}) => (
	<Collapsible asChild defaultOpen={isActive}>
		<SidebarMenuItem>
			<CollapsibleTrigger asChild>
				<SidebarMenuButton tooltip={item.title} isActive={isActive}>
					<item.icon />
					<span>{item.title}</span>
					<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
				</SidebarMenuButton>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<SidebarMenuSub>
					{item.items.map((subItem) => (
						<SidebarMenuSubItem key={subItem.title}>
							<SidebarMenuSubButton
								asChild
								isActive={
									pathname.startsWith(subItem.url) && subItem.url !== "/"
								}
							>
								<Link to={subItem.url}>
									<subItem.icon />
									<span>{subItem.title}</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
					))}
				</SidebarMenuSub>
			</CollapsibleContent>
		</SidebarMenuItem>
	</Collapsible>
);

// --- Type guards ---

// Narrows NavItem to its collapsible shape — the else branch is implicitly SingleNavItemType
const isCollapsible = (item: NavItem): item is CollapsibleNavItemType =>
	Array.isArray(item.items);

// --- Main component ---

export const AppNavigation = () => {
	const pathname = useRouterState({
		select: (s) => s.location.pathname,
	});

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>
			<SidebarMenu>
				{navigation.map((item) => {
					const isActive = isCollapsible(item)
						? item.items.some(
								(sub) => pathname.startsWith(sub.url) && sub.url !== "/",
							)
						: pathname === item.url;

					return isCollapsible(item) ? (
						<CollapsibleNavItem
							key={item.title}
							item={item}
							isActive={isActive}
							pathname={pathname}
						/>
					) : (
						<SingleNavItem key={item.title} item={item} isActive={isActive} />
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
};