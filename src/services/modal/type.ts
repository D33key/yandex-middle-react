import type { statusText } from '@/constansts/statusText';

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
	status: keyof typeof statusText;
	ingredients: {
		img: string;
		name: string;
		price: number;
	}[];
	date: string;
	totalPrice: number;
}
