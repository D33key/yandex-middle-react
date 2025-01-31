import { useAppSelector } from '@/helpers/hooks/useRTK';
import TextWithBigNumber from '../text-with-big-number';
import Loader from '../loader';
import FeedStatus from '../feed-status';

export default function FeedInfo() {
	const { data } = useAppSelector((state) => state.webSocketSlice);

	return (
		<div className='flex flex-col gap-60 m-left-60'>
			{!data && <Loader />}
			{data && (
				<>
					<div className='flex justify-between gap-36'>
						<FeedStatus status='done' />
						<FeedStatus status='in progress' />
					</div>
					<TextWithBigNumber
						text='Выполнено за все время:'
						count={data.total}
					/>
					<TextWithBigNumber
						text='Выполнено за сегодня:'
						count={data.totalToday}
					/>
				</>
			)}
		</div>
	);
}
