import Typography from '../ui/typography/Typography';
import cl from './Loader.module.css';
import Wrapper from './Wrapper';

function Loader() {
	return (
		<div className={cl.wrapper}>
			<span className={cl.spinner}></span>
			<Typography>Загружаем...</Typography>
		</div>
	);
}

Loader.Wrapper = Wrapper;

export default Loader;
