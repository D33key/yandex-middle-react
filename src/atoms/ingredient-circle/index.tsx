import Typography from '../typography/Typography';
import cl from './Circle.module.css';

interface IngredientCircleProps {
	img: string;
	isLast?: boolean;
	amountOfRemainingIngredients?: number;
	name?: string;
}

export default function IngredientCircle({
	img,
	name,
	amountOfRemainingIngredients,
	isLast,
}: IngredientCircleProps) {
	return (
		<div className={cl.wrapper}>
			<img className={cl.img} src={img} alt={name ?? 'Ингредиент'} />
			{isLast && (
				<div className={cl.last}>
					<Typography type='digits'>+{amountOfRemainingIngredients}</Typography>
				</div>
			)}
		</div>
	);
}
