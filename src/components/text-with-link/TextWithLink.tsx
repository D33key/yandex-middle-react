import { Link } from 'react-router';
import Typography from '../ui/typography/Typography';
import cl from './TextWithLink.module.css';

export interface TextWithLinkProps {
	array: {
		text: string;
		link: `/${string}`;
		linkText: string;
	}[];
}

function TextWithLink({ array }: TextWithLinkProps) {
	return (
		<div className={`flex flex-col text-center ${cl.wrapper}`}>
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
