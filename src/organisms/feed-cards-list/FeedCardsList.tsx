import FeedCard from '@/cells/feed-card';
import { useAppSelector } from '@/helpers/hooks/useRTK';

function FeedCardsList() {
	const { data, connected, error } = useAppSelector(
		(state) => state.webSocketSlice,
	);
	console.log(data);

	return (
		<div className='flex justify-between flex-col'>
			{data?.map((order) => (
				<FeedCard
					key={order._id}
					dateFromServer={order.createdAt}
					id={order.number}
					name={order.name}
					price={order.price!}
					ingredients={order.ingredients}
				/>
			))}
		</div>
	);
}

export default FeedCardsList;
