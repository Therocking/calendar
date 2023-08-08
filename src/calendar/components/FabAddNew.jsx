import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hook'


export const FabAddNew = () => {

  const { setActiveEvent } = useCalendarStore()

  const { openModal } = useUiStore();

  const onNewModalEvent = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2 ),
      bgColor: '#fafafa',
      user: {
        _id: '4556',
        name: 'adrin'
      }
    })
    
    openModal()
  }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ onNewModalEvent }      
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
