import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onCheking, onLogin, onLogout } from '../store/auth/authSlice';
import { dicErrores } from '../errors/dicErrores';
import { onLogoutCalendar } from '../store/calendar/calendarSlice';

/* 
    "email": "jose@gmail.com",
    "password": "123456"
*/

export const useAuthStore = () => {
  
    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onCheking() );

        try {
            
            const {data} = await calendarApi.post('/auth', {email, password});
     
            const { token, uid, name } = data; 

            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
     
            dispatch( onLogin({ uid, name }) );
        } catch (error) {

            dispatch( onLogout(dicErrores.CREDENCIALES_INCORRECTAS) );
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 1000)
        }
    };

    const startRegister = async({ name, email, password }) => {
        dispatch( onCheking() )
        try {
            
            const resp = await calendarApi.post('/auth/new', { name, email, password });
            
            const { name:userName, uid, token } = resp.data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
    
            dispatch( onLogin({ userName, uid }) );
        } catch (error) {
            console.log(error);
            dispatch( onLogout(error.response.data?.msg) )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 1000)
        }
    };


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        
        if( !token ) return dispatch( onLogout() );

        try {
            
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            localStorage.clear()
            console.log(error);
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() ) 
        dispatch( onLogout() );
    }
  
    return {
        //* propiedades
        errorMessage,
        status,
        user,

        //* metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}
