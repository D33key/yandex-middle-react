import Typography from '../../ui/typography/Typography';
import { INGREDIENT_INFO } from './constants';
import cl from './IngredientInfo.module.css';

export interface InfoProps {
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
}

export default function IngredientInfo(props: InfoProps) {
	return (
		<div className={`${cl.gap} flex flex-row`}>
			{INGREDIENT_INFO.map(({ title, type }) => (
				<div className={cl.info}>
					<Typography isInactive>{title}</Typography>
					<Typography type='digits' isInactive>
						{props[type]}
					</Typography>
				</div>
			))}
		</div>
	);
}
