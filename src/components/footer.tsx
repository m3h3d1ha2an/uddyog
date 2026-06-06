export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-20 border-t border-(--line) px-4 pb-14 pt-10 text-(--sea-ink-soft)">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<p className="m-0 text-sm">
					&copy; {year} Tanstack Starter Template. All rights reserved.
				</p>
				<p className="island-kicker m-0">
					Built by <a href="https://github.com/m3h3d1ha2an">Mehedi Hasan</a>
				</p>
			</div>
		</footer>
	);
};
