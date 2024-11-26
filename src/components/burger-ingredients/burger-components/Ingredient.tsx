import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SectionsRef } from '../../../hooks/useTab/useTab';
import { TabName } from '../../tab/types';
import Subtitle from '../../ui/heading/Subtitle';
import { CategoriesType } from '../types';
import cl from './Ingredient.module.css';
import { useAppDispatch } from '../../../hooks/rtk';
import { openModal } from '../../../services/modal';

interface Props {
	data: CategoriesType[];
	title: string;
	section: TabName;
	setSections: React.Dispatch<React.SetStateAction<SectionsRef>>;
}

export default function Ingredient({
	data,
	title,
	section,
	setSections,
}: Props) {
	const dispatch = useAppDispatch();

	const handleProductClick = (product: CategoriesType) => {
		dispatch(openModal(product));
	};

	return (
		<div
			className={cl.wrapper}
			data-section={section}
			ref={(el) => {
				setSections((prev) => ({ ...prev, [section]: el }));
			}}
		>
			<Subtitle>{title}</Subtitle>
			<div className={cl.productsArrayWrapper}>
				{data.map((product) => (
					<div
						key={product._id}
						className={cl.productWrapper}
						onClick={() => handleProductClick(product)}
					>
						<div className={cl.img}>
							<img src={product.image} alt={product.name} />
							{product.amount > 0 && (
								<Counter
									count={product.amount}
									size='default'
									extraClass='m-1'
								/>
							)}
						</div>
						<p className={`text text_type_digits-default ${cl.price}`}>
							{product.price} <CurrencyIcon type='primary' />
						</p>
						<p className='text text_type_main-default'>{product.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
