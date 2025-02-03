import type { FeedInfo } from '@/services/modal/type';
import { useRef } from 'react';
import useOpenConnectionWebsocket from '../useOpenConnectionWebsocket';
import { useAppSelector } from '../useRTK';

export default function useGetFeedCardInfoById(
	id: string,
	isForSpecificUser = false,
): { isLoading: boolean; cardInfo: FeedInfo | null } {
	const isLoading = useRef(true);
	const { data } = useAppSelector((state) => state.webSocketSlice);
	useOpenConnectionWebsocket(isForSpecificUser);

	if (!data)
		return {
			isLoading: isLoading.current,
			cardInfo: null,
		};

	const {
		name,
		number,
		status,
		price,
		createdAt: dateFromServer,
		ingredients,
	} = data.orders.find((order) => order.number === Number(id))!;

	isLoading.current = false;

	return {
		isLoading: isLoading.current,
		cardInfo: {
			title: `#${number}`,
			name,
			status,
			totalPrice: price!,
			ingredients,
			date: dateFromServer,
		},
	};
}
