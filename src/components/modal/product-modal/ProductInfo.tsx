import cl from './ProductInfo.module.css';

type Props = {
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
};

export default function ProductInfo({
	fat,
	proteins,
	calories,
	carbohydrates,
}: Props) {
	return (
		<div className={`${cl.gap} flex flex-row`}>
			<div className={cl.info}>
				<p className='text text_type_main-default text_color_inactive'>
					Калории,ккал
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					{calories}
				</p>
			</div>
			<div className={cl.info}>
				<p className='text text_type_main-default text_color_inactive'>
					Белки, г
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					{proteins}
				</p>
			</div>
			<div className={cl.info}>
				<p className='text text_type_main-default text_color_inactive'>
					Жиры, г
				</p>
				<p className='text text_type_main-default text_color_inactive'>{fat}</p>
			</div>
			<div className={cl.info}>
				<p className='text text_type_main-default text_color_inactive'>
					Углеводы, г
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					{carbohydrates}
				</p>
			</div>
		</div>
	);
}
