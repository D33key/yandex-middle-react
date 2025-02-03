import Typography from '../../atoms/typography/Typography';

type Props = { text: string; count: number };

export default function TextWithBigNumber({ text, count }: Props) {
	return (
		<div className='flex flex-col'>
			<Typography size='medium'>{text}</Typography>
			<Typography size='large' type='digits' extraClass='digit-shadow'>
				{count}
			</Typography>
		</div>
	);
}
