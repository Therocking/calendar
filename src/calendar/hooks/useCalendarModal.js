import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import { useUiStore } from '../../hook/useUiStore';
import { useCalendarStore } from '../../hook';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'


export const useCalendarModal = () => {

    const { activeEvent, startSavingEvent, clearActiveEvent } = useCalendarStore();

    const { isDateModalOpen, closeModal } = useUiStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });

    const titleclass = useMemo(() => {
        if( !formSubmitted ) return '';

        return ( formValues.title.length > 0 )
                ? ''
                : 'is-invalid' 

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
      
        if( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }

    }, [activeEvent]);
    

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onDateChage = (e, chaging ) => {
        setFormValues({
            ...formValues,
            [chaging]: e,
        });
    };

    const onCloseModal = () => {
        clearActiveEvent()
        
        closeModal()
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        setFormSubmitted( true )

        const difference = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas Invalidas', 'Revisa las fechas antes de enviar', 'error');
            return;
        }

        if( formValues.title.length < 1 ) return //Swal.fire('Titulo Invalido','El titulo no puede ir vacio', 'error');

        await startSavingEvent(formValues);
        closeModal();
        setFormSubmitted(false);
    };

  return {
    formValues,
    isDateModalOpen,
    onCloseModal,
    onDateChage,
    onInputChange,
    onSubmit,
    titleclass,
  }
}
