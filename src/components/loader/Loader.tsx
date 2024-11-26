import cl from './Loader.module.css';

export default function Loader() {
	return (
		<div className={cl.wrapper}>
			<span className={cl.spinner}></span>
			<span className='text text_type_main-default'>Загружаем...</span>
		</div>
	);
}
