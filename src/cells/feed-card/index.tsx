import IngredientCircleList from '@/molecules/ingredients-circle-list';
import Price from '../../atoms/price';
import Typography from '../../atoms/typography/Typography';
import cl from './FeedCard.module.css';
import { Link, useLocation } from 'react-router';
import { PAGE_URLS } from '@/constansts/page-urls';
import { useAppDispatch } from '@/helpers/hooks/useRTK';
import { openModal } from '@/services/modal';
import type { FeedInfo } from '@/services/modal/type';
import FormattedDate from '@/atoms/formatted-date';

interface FeedCardProps {
	linkId: string;
	id: string;
	dateFromServer: string;
	name: string;
	price: number;
	ingredients: FeedInfo['ingredients'];
	status: 'done' | 'in progress';
}

export default function FeedCard({
	id,
	dateFromServer,
	name,
	price,
	ingredients,
	linkId,
	status,
}: FeedCardProps) {
	const dispatch = useAppDispatch();
	const location = useLocation();

	return (
		<Link
			to={`${PAGE_URLS.feed}/${linkId}`}
			onClick={() =>
				dispatch(
					openModal({
						title: `#${id}`,
						name,
						status,
						totalPrice: price,
						ingredients,
						date: dateFromServer,
					}),
				)
			}
			state={{ background: location }}
			replace
		>
			<div className={cl.wrapper}>
				<div className='flex justify-between items-center'>
					<Typography type='digits'>#{id}</Typography>
					<FormattedDate date={dateFromServer} />
				</div>

				<Typography size='medium'>{name}</Typography>

				<div className='flex justify-between'>
					<IngredientCircleList ingredients={ingredients} />
					<Price amount={price} size='default' />
				</div>
			</div>
		</Link>
	);
}
