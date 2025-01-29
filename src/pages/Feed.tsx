import Title from '@/atoms/heading/Title';
import Main from '@/atoms/main/Main';
import Section from '@/atoms/section/Section';
import FeedCard from '@/cells/feed-card';

export default function Feed() {
	return (
		<Main>
			<Section>
				<Title>Лента заказов</Title>
				<div className='flex justify-between'>
					<FeedCard
						id='#213'
						dateFromServer='2024-11-30'
						name='Empty'
						price={132123}
						ingredients={[
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
							'https://i.pinimg.com/originals/39/dc/0d/39dc0d67814f328bb4f4f5451f3d075b.png',
						]}
					/>
				</div>
			</Section>
		</Main>
	);
}
