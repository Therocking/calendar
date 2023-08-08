import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent= {
//     _id: new Date().getTime(),
//     title: 'nuevo ',
//     notes: 'este es un nuevo evento',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '4556',
//       name: 'adrin'
//     }
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: true,
        events: [
            // tempEvent

        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload
        },
        onClearActiveEvent: (state) => {
            state.activeEvent = null
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {

                if( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id )
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, {payload = []}) => {
            state.isLoading = false;
            payload.forEach( event  => {
                const exist = state.events.some( dbEvent => dbEvent.id === event.id );

                if( !exist ) {
                    state.events.push( event )
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoading = false;
            state.events = [];
            state.activeEvent = null;
        }
    },
});

export const { 
    onClearActiveEvent,
    onAddNewEvent,
    onDeleteEvent, 
    onSetActiveEvent,
    onUpdateEvent,
    onLoadEvents,
    onClearEvents,
    onLogoutCalendar,
} = calendarSlice.actions;