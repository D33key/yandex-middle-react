import { Link } from 'react-router';
import Typography from '@/atoms/typography/Typography';
import type { TextWithLinkProps } from '@/types/TextWithLink';

function TextWithLink({ array }: TextWithLinkProps) {
	return (
		<div className={`flex flex-col text-center margin-top-80px`}>
			{array.map((item) => (
				<Typography key={item.linkText}>
					{item.text}{' '}
					<Link to={item.link} className='link-color' viewTransition>
						{item.linkText}
					</Link>
				</Typography>
			))}
		</div>
	);
}

export default TextWithLink;
