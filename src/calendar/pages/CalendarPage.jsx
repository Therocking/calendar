import { Calendar } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'


import { CalendarEvent, Navbar, CalendarModal, FabAddNew, FabDelete } from '../'
import { getMessagesES, localizer } from '../../helper'
import { useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hook/'
import { useEffect } from 'react'


export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const { openModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  
  
  const eventStyleGetter = (event, /*start, end, isSeleted*/) => {
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : 'black',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }
  }

  const onDobleClick = () => {
    openModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvent();
  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={ lastView }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={ {
          event: CalendarEvent
        } }
        onDoubleClickEvent={ onDobleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal/>

      <FabAddNew />

      <FabDelete isMyEvent={true}/>
    </>
  )
}
