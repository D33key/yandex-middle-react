import Typography from '@/atoms/typography/Typography';
import cl from './Loader.module.css';

function Loader() {
	return (
		<div className={cl.wrapper}>
			<span className={cl.spinner}></span>
			<Typography>Загружаем...</Typography>
		</div>
	);
}

interface WrapperProps {
	children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
	return <div className={cl.loaderWrapper}>{children}</div>;
}

Loader.Wrapper = Wrapper;

export default Loader;
