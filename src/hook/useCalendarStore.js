import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onClearActiveEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { converToEvent } from '../helper';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {
  
  const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth )
  
    const startSavingEvent = async(calendarEvent) => {

      try {
        if( calendarEvent.id ) {
          //actiliza evento
          await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);       
          dispatch( onUpdateEvent({ ...calendarEvent, user }) );
          return;
        }
  
        //crea evento
          const { data } = await calendarApi.post('/events', calendarEvent);
          dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        
      } catch (error) {
       Swal.fire('Error al guardar', error.response.data.msg, 'error'); 
      }
    } 

    const setActiveEvent = (calendarEvent) => {
      dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startDeletingEvent = async() => {
      try {
        await calendarApi.delete(`/events/${activeEvent.id}`)
        dispatch( onDeleteEvent() );
        
      } catch (error) {
        Swal.fire('Error al eliminar', error.response.data.msg,'error')
      }
    }

    const clearActiveEvent = () => {
      dispatch( onClearActiveEvent() )
    }

    const startLoadingEvent = async() => {
      try {
        
        const {data} = await calendarApi.get('/events');
        const events = converToEvent(data.eventos);

        dispatch( onLoadEvents(events) );

      } catch (error) {
        console.error(error);
      }
    }
   
    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Metodos
        clearActiveEvent,
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
        startLoadingEvent,
  }
}
