import Title from '@/atoms/heading/Title';
import Main from '@/atoms/main/Main';
import Section from '@/atoms/section/Section';
import useOpenConnectionWebsocket from '@/helpers/hooks/useOpenConnectionWebsocket';
import FeedCardsList from '@/organisms/feed-cards-list/FeedCardsList';

export default function Feed() {
	useOpenConnectionWebsocket();

	return (
		<Main>
			<Section>
				<Title>Лента заказов</Title>
				<FeedCardsList />
			</Section>
		</Main>
	);
}
