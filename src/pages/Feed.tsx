import Title from '@/atoms/heading/Title';
import Main from '@/atoms/main/Main';
import Section from '@/atoms/section/Section';
import useOpenConnectionWebsocket from '@/helpers/hooks/useOpenConnectionWebsocket';
import FeedInfo from '@/molecules/feed-info';
import FeedCardsList from '@/organisms/feed-cards-list/FeedCardsList';

export default function Feed({
	isForSpecificUser = false,
}: {
	isForSpecificUser?: boolean;
}) {
	useOpenConnectionWebsocket(isForSpecificUser);

	return (
		<Main>
			<Section>
				{!isForSpecificUser && <Title>Лента заказов</Title>}
				<div className='flex'>
					<FeedCardsList />
					{!isForSpecificUser && <FeedInfo />}
				</div>
			</Section>
		</Main>
	);
}
