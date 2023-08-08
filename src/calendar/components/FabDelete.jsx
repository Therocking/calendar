// import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hook'


export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore()
    
  const { isDateModalOpen } = useUiStore();

  return (
    <button
        className="btn btn-danger fab-delete"
        onClick={ startDeletingEvent }      
        style={{
          display: (hasEventSelected && !isDateModalOpen) ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
