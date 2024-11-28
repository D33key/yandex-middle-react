import Typography from '../ui/typography/Typography';
import cl from './Loader.module.css';

export default function Loader() {
	return (
		<div className={cl.wrapper}>
			<span className={cl.spinner}></span>
			<Typography>Загружаем...</Typography>
		</div>
	);
}
