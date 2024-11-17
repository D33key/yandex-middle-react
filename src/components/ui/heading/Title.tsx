import cl from './Title.module.css';

type Props = {
	children: React.ReactNode;
};

export default function Title({ children }: Props) {
	return (
		<h1 className={`text text_type_main-large ${cl.header}`}>{children}</h1>
	);
}
