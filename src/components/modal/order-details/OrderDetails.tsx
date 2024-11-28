import Typography from '../../ui/typography/Typography';
import cl from './OrderDetails.module.css';

export default function OrderDetails({ orderNumber }: { orderNumber: number }) {
	return (
		<div className={`flex flex-col items-center ${cl.padding}`}>
			<Typography
				type='digits'
				size='large'
				extraClass={`${cl.digits} ${cl['margin-top-1']}`}
			>
				{orderNumber}
			</Typography>
			<Typography
				size='medium'
				extraClass={`${cl['margin-top-2']} ${cl['margin-bottom-3']}`}
			>
				идентификатор заказа
			</Typography>
			<img src='./src/images/done.png' alt='Заказ принят' />
			<Typography
				extraClass={`${cl['margin-top-3']} ${cl['margin-bottom-05']}`}
			>
				Ваш заказ начали готовить
			</Typography>
			<Typography isInactive>
				Дождитесь готовности на орбитальной станции
			</Typography>
		</div>
	);
}
