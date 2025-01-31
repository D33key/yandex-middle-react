import Typography from '@/atoms/typography/Typography';
import cl from './FeedCardsList.module.css';
import FeedCard from '@/cells/feed-card';
import { useAppSelector } from '@/helpers/hooks/useRTK';
import Loader from '@/molecules/loader';

function FeedCardsList() {
	const { data, error } = useAppSelector((state) => state.webSocketSlice);

	return (
		<div className={`${cl.wrapper} flex justify-between flex-col gap-16`}>
			{!data && <Loader />}
			{error && (
				<Typography>Возникла ошибка при обработке ленты заказов!</Typography>
			)}
			{data &&
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
					/>
				))}
		</div>
	);
}

export default FeedCardsList;
