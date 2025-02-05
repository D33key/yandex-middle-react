import IngredientCircle from '@/atoms/ingredient-circle';
import Price from '@/atoms/price';
import Typography from '@/atoms/typography/Typography';

export interface IngredientRowProps {
	img: string;
	name: string;
	count: number;
	price: number;
}

export default function IngredientRow({
	count,
	img,
	name,
	price,
}: IngredientRowProps) {
	return (
		<div className='flex flex-row gap-16 items-center'>
			<IngredientCircle img={img} />
			<Typography>{name}</Typography>
			<Price
				amount={price}
				size='default'
				withCount={count}
				extraClass='m-left-auto'
			/>
		</div>
	);
}
