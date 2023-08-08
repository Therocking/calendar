import { AppRouter } from './router/AppRouter'
import {BrowserRouter} from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'


export const CalendarApp = () => {
  return (
    <>
      <Provider store={ store } >
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </Provider>
    </>
  )
}
