import type { FeedInfo } from '@/services/modal/type';
import useOpenConnectionWebsocket from '../useOpenConnectionWebsocket';
import { useAppSelector } from '../useRTK';

export default function useGetFeedCardInfoById(id: string): FeedInfo | null {
	const { data } = useAppSelector((state) => state.webSocketSlice);
	useOpenConnectionWebsocket();

	if (!data) return null;

	const {
		name,
		number,
		status,
		price,
		createdAt: dateFromServer,
		ingredients,
	} = data.orders.find((order) => order._id === id)!;

	return {
		title: `#${number}`,
		name,
		status,
		totalPrice: price!,
		ingredients,
		date: dateFromServer,
	};
}
