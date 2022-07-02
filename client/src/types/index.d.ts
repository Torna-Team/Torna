export {};

declare global {
	interface Window {
		gifler: any; // 👈️ turn off type checking
	}

	type Album = {
		id: number;
		title: string;
		template: string;
		authorId: number;
		background: text;
		frontPage: text;
	};
}
