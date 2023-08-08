import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../../hook/';
import Swal from 'sweetalert2';


export const useLogin = (
    loginEmail, 
    loginPassword, 
    registerName, 
    registerEmail,
    registerPassword,
    registerPassword2,
    ) => {
    // parte de prueba - validacion
 const [formSubmitted, setFormSubmitted] = useState(false)

 const { startLogin, startRegister, errorMessage } = useAuthStore();

 useEffect(() => {
   if( !!errorMessage ) {
    Swal.fire('Error de autenticacion', errorMessage, 'error')
   } 
 }, [errorMessage])
 

 const loginSubmit = (e) => {
     e.preventDefault();

     startLogin({ email: loginEmail, password: loginPassword });
 }

 const registerSubmit = (e) => {
     e.preventDefault()
     
     // parte de prueba - validacion
     setFormSubmitted(true)

     if( registerPassword !== registerPassword2 ) {
        Swal.fire('Error en registro', 'Pass incorrecto', 'error');
        return
     }

     const user = {
      name: registerName,
      email: registerEmail,
      password: registerPassword
     }

     startRegister(user);
 };

 // parte de prueba - validacion
 const titleclass = useMemo(() => {
     if( !formSubmitted ) return '';

     return ( registerPassword === registerPassword2 )
             ? ''
             : 'is-invalid' 

 }, [registerPassword2, formSubmitted]);



  return {
    loginSubmit,
    titleclass,
    registerSubmit,
  }
}

 