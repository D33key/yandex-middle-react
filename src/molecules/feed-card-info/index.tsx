import Caption from '@/atoms/caption';
import FormattedDate from '@/atoms/formatted-date';
import Price from '@/atoms/price';
import Typography from '@/atoms/typography/Typography';
import transformIngredientsWithCount from '@/helpers/utils/transformIngredientsWithCount';
import type { FeedInfo } from '@/services/modal/type';
import IngredientRow from '../ingredient-row';
import cl from './FeedCardInfo.module.css';

function FeedCardInfo({
	cardInfo,
	shouldDisplayNumber = false,
}: {
	cardInfo: FeedInfo;
	shouldDisplayNumber?: boolean;
}) {
	const tranformIngredient = transformIngredientsWithCount(
		cardInfo.ingredients,
	);

	const statusText = cardInfo.status === 'done' ? 'Выполнено' : 'В процесса';
	const statusColor = cardInfo.status === 'done' ? 'aqua' : 'red';
	return (
		<div className='flex flex-col'>
			{shouldDisplayNumber && <Typography>${cardInfo.title}</Typography>}
			<div className={cl.wrapper}>
				<div className='flex flex-col gap-12 m-bottom-60'>
					<Typography size='medium'>{cardInfo.name}</Typography>
					<Caption color={statusColor}>{statusText}</Caption>
				</div>
				<Typography size='medium'>Состав</Typography>
				<div
					className={`flex flex-col gap-16 m-top-24 ${cl.ingredientWrapper}`}
				>
					{tranformIngredient.map((ingredient) => (
						<IngredientRow
							key={ingredient.name}
							img={ingredient.img}
							name={ingredient.name}
							price={ingredient.price}
							count={ingredient.count}
						/>
					))}
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<FormattedDate date={cardInfo.date} />
				<Price amount={cardInfo.totalPrice} size='default' />
			</div>
		</div>
	);
}

export default FeedCardInfo;
