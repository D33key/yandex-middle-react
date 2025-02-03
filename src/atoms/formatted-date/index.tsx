import { FormattedDate as YFormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = { date: string };

export default function FormattedDate({ date }: Props) {
	return (
		<YFormattedDate
			className='text text_type_main-small text_color_inactive'
			date={new Date(date)}
		/>
	);
}
