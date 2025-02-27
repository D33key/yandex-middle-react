import Typography from '@/atoms/typography/Typography';
import { useAppSelector } from '@/helpers/hooks/useRTK';
import cl from './FeedStatus.module.css';
import { statusText } from '@/constansts/statusText';

export default function FeedStatus({
	status,
}: {
	status: keyof typeof statusText;
}) {
	const text = status === 'done' ? 'Готовы:' : 'В работе:';
	const statusColor = status === 'done' ? 'aqua' : 'red';
	const { data } = useAppSelector((state) => state.webSocketSlice);
	const arrayOfStatuses = data?.orders.filter(
		(order) => order.status === status,
	);

	return (
		<div className={`${cl.wrapper} flex flex-col gap-24`}>
			<Typography size='medium'>{text}</Typography>
			<div className={`flex flex-col gap-8 ${cl.statusWrapper}`}>
				{arrayOfStatuses?.map((item) => (
					<Typography key={item.number} extraClass={statusColor} type='digits'>
						{item.number}
					</Typography>
				))}
			</div>
		</div>
	);
}
