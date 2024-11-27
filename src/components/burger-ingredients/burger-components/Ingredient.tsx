import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SectionsRef } from '../../../hooks/useTab/useTab';
import { TabName } from '../../tab/types';
import Subtitle from '../../ui/heading/Subtitle';
import { CategoriesType } from '../types';
import cl from './Ingredient.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { openModal } from '../../../services/modal';
import { useDrag } from 'react-dnd';
import { DRAG_TYPE_INGREDIENT } from '../../../constansts';
import { RootState } from '../../../services/store';
import { useMemo } from 'react';

interface Props {
	data: CategoriesType[];
	title: string;
	section: TabName;
	setSections: React.Dispatch<React.SetStateAction<SectionsRef>>;
}

export default function IngredientWrapper({
	data,
	title,
	section,
	setSections,
}: Props) {
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
					<Ingredient key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

function Ingredient({ product }: { product: CategoriesType }) {
	const [_, drag] = useDrag(() => ({
		type: DRAG_TYPE_INGREDIENT,
		item: product,
	}));
	const dispatch = useAppDispatch();

	const handleProductClick = (product: CategoriesType) => {
		dispatch(openModal(product));
	};
	return (
		<div
			className={cl.productWrapper}
			onClick={() => handleProductClick(product)}
			ref={drag}
		>
			<div className={cl.img}>
				<img src={product.image} alt={product.name} />
				<Amount id={product._id} type={product.type} />
			</div>
			<p className={`text text_type_digits-default ${cl.price}`}>
				{product.price} <CurrencyIcon type='primary' />
			</p>
			<p className='text text_type_main-default'>{product.name}</p>
		</div>
	);
}

function Amount({ id, type }: { id: string; type: TabName }) {
	const order = useAppSelector((state: RootState) => state.burgerStructure);

	const amount = useMemo(() => {
		return type === 'bun'
			? order.filter((item) => item._id === id).length - 1
			: order.filter((item) => item._id === id).length;
	}, [order]);

	return (
		amount > 0 && <Counter count={amount} size='default' extraClass='m-1' />
	);
}
