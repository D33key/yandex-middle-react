import Title from '@/atoms/heading/Title';
import Main from '@/atoms/main/Main';
import useGetFeedCardInfoById from '@/helpers/hooks/useGetFeedCardInfoById';
import FeedCardInfo from '@/molecules/feed-card-info';
import Loader from '@/molecules/loader';
import type { FeedInfo } from '@/services/modal/type';
import { useState } from 'react';
import { useParams } from 'react-router';

function FeedId({
	isForSpecificUser = false,
}: {
	isForSpecificUser?: boolean;
}) {
	const params = useParams();
	const { isLoading, cardInfo } = useGetFeedCardInfoById(
		params.id ?? '',
		isForSpecificUser,
	);

	return (
		<FeedId.Layout>
			{isLoading && <Loader />}
			<FeedId.Content cardInfo={cardInfo} />
		</FeedId.Layout>
	);
}

function Content({ cardInfo }: { cardInfo: FeedInfo | null }) {
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

function Layout({ children }: { children: React.ReactNode }) {
	const [localStorageInfo] = useState<FeedInfo | null>(() => {
		const cardInfo = localStorage.getItem('modalInfo');
		if (cardInfo) {
			return JSON.parse(cardInfo);
		}

		return null;
	});
	return (
		<>
			{localStorageInfo && <Content cardInfo={localStorageInfo} />}
			{!localStorageInfo && children}
		</>
	);
}

FeedId.Layout = Layout;
FeedId.Content = Content;

export default FeedId;
