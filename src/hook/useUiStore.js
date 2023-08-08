import { useDispatch, useSelector } from 'react-redux'
import { onOpenDateModal, onCloseDateModal } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch()

    const {
        isDateModalOpen,
    } = useSelector(state => state.ui);

    const closeModal = () => {
        dispatch( onCloseDateModal() )
    }

    const openModal = () => {
        dispatch( onOpenDateModal() )
    }



    return { 
        isDateModalOpen,
        openModal,
        closeModal,
    }
}
