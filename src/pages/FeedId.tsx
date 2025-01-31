import Title from '@/atoms/heading/Title';
import Main from '@/atoms/main/Main';
import useGetFeedCardInfoById from '@/helpers/hooks/useGetFeedCardInfoById';
import FeedCardInfo from '@/molecules/feed-card-info';
import { useParams } from 'react-router';

export default function FeedId() {
	const params = useParams();
	const cardInfo = useGetFeedCardInfoById(params.id ?? '');

	console.log(cardInfo);

	return (
		<Main variant='center' className='items-center'>
			{cardInfo && (
				<div className='flex flex-col content-feed-id '>
					<Title as='h3' isWide type='digits-default' isCenter>
						{cardInfo.title}
					</Title>
					<FeedCardInfo cardInfo={cardInfo} />
				</div>
			)}
		</Main>
	);
}
