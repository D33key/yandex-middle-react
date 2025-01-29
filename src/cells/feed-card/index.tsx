import IngredientCircleList from '@/molecules/ingredients-circle-list';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../atoms/price';
import Typography from '../../atoms/typography/Typography';
import cl from './FeedCard.module.css';

interface FeedCardProps {
	id: string;
	dateFromServer: string;
	name: string;
	price: number;
	ingredients: string[];
}

export default function FeedCard({
	id,
	dateFromServer,
	name,
	price,
	ingredients,
}: FeedCardProps) {
	return (
		<div className={cl.wrapper}>
			<div className='flex justify-between items-center'>
				<Typography type='digits'>{id}</Typography>
				<FormattedDate date={new Date(dateFromServer)} />
			</div>

			<Typography size='medium'>{name}</Typography>

			<div className='flex justify-between'>
				<IngredientCircleList ingredients={ingredients} />
				<Price amount={price} size='default' />
			</div>
		</div>
	);
}
