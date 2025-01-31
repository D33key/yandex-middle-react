export interface OrderInfo {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export interface FeedInfo {
	title: `#${string}`;
	name: string;
	status: string;
	ingredients: {
		img: string;
		name: string;
		price: number;
	}[];
	date: string;
	totalPrice: number;
}
