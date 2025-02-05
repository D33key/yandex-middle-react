import { useAppDispatch, useAppSelector } from '@/helpers/hooks/useRTK';
import FeedCardInfo from '@/molecules/feed-card-info';
import Modal from '@/molecules/modal/Modal';
import { closeModal } from '@/services/modal';
import type { RootState } from '@/services/store';
import { memo } from 'react';

function FeedModal() {
	const selectedFeedCard = useAppSelector(
		(state: RootState) => state.modalInfo,
	);
	const dispatch = useAppDispatch();

	return (
		selectedFeedCard &&
		'status' in selectedFeedCard && (
			<Modal
				headerTitle={selectedFeedCard.title}
				headerType='digits-default'
				onClose={() => dispatch(closeModal())}
			>
				<FeedCardInfo cardInfo={selectedFeedCard} />
			</Modal>
		)
	);
}

export default memo(FeedModal);
