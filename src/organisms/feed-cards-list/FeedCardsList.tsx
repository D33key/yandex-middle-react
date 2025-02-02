import FeedCard from '@/cells/feed-card';
import { useAppSelector } from '@/helpers/hooks/useRTK';
import EmptyCart from '@/molecules/empty-cart';
import Loader from '@/molecules/loader';
import cl from './FeedCardsList.module.css';

function FeedCardsList({
	isForSpecificUser = false,
}: {
	isForSpecificUser?: boolean;
}) {
	const { data } = useAppSelector((state) => state.webSocketSlice);
	return (
		<div className={`${cl.wrapper} flex justify-between flex-col gap-16`}>
			{!data && <Loader />}
			{data &&
				data.orders.length !== 0 &&
				data.orders.map((order) => (
					<FeedCard
						key={order._id}
						linkId={order._id}
						dateFromServer={order.createdAt}
						id={order.number}
						name={order.name}
						price={order.price!}
						ingredients={order.ingredients}
						status={order.status}
						isForSpecificUser={isForSpecificUser}
					/>
				))}
			{data && data.orders.length === 0 && <EmptyCart text='Пусто' />}
		</div>
	);
}

export default FeedCardsList;
