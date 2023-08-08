import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hook'
import { useEffect } from 'react'
import { Spinner } from './components/Spinner'

export const AppRouter = () => {
  
    const { status, checkAuthToken }  = useAuthStore();

    useEffect(() => {
     checkAuthToken()
    }, []);

    if ( status === 'checking' ) {
        
        return (
            <Spinner/>
        )
    } 

    // const authStatus = 'not-athenticated'
    
    return (
    <Routes>
        {
            (status === 'not-athenticated') 
                ? (
                    <>
                        <Route path='/auth/*' element={ <LoginPage/> } />
                        <Route path='/*' element={ <Navigate to='/auth/login'/> } /> 
                    </>
                )
                : (
                    <>
                        <Route path='/' element={ <CalendarPage/> } />
                        <Route path='/*' element={ <Navigate to='/'/> } /> 
                    </>
                )
        }

        
        

    </Routes>
  )
}
