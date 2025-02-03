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
import { statusText } from '@/constansts/statusText';
import Caption from '@/atoms/caption';
import { statusText as stText } from '@/constansts/statusText';

interface FeedCardProps {
	linkId: string;
	id: string;
	dateFromServer: string;
	name: string;
	price: number;
	ingredients: FeedInfo['ingredients'];
	status: keyof typeof statusText;
	isForSpecificUser?: boolean;
}

export default function FeedCard({
	id,
	dateFromServer,
	name,
	price,
	ingredients,
	linkId,
	status,
	isForSpecificUser = false,
}: FeedCardProps) {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const url = isForSpecificUser ? PAGE_URLS.orders : PAGE_URLS.feed;
	const statusText = stText[status];
	const statusColor = status === 'done' ? 'aqua' : 'red';

	return (
		<Link
			to={`${url}/${linkId}`}
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
				<div className='flex flex-col gap-8'>
					<Typography size='medium'>{name}</Typography>

					{isForSpecificUser && (
						<Caption color={statusColor}>{statusText}</Caption>
					)}
				</div>

				<div className='flex justify-between'>
					<IngredientCircleList ingredients={ingredients} />
					<Price amount={price} size='default' />
				</div>
			</div>
		</Link>
	);
}
