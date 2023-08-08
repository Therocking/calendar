import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';

import Modal from 'react-modal';
import { useCalendarModal } from '../hooks/useCalendarModal';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export const CalendarModal = () => {

    const {
        formValues, 
        isDateModalOpen,
        onCloseModal,
        onDateChage,
        onInputChange,
        onSubmit,
        titleclass,
    } = useCalendarModal();

  return (
    <Modal
        className='modal'
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
    >
        <h1>Nuevo evento</h1>
        <hr />

        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    selected={formValues.start}
                    onChange={ (e) => onDateChage(e, 'start') }
                    className='form-control'
                    dateFormat='Pp'
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"  
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    minDate={ formValues.start } 
                    selected={formValues.end}
                    onChange={ (e) => onDateChage(e, 'end') }
                    className='form-control'
                    dateFormat='Pp'
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora" 
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleclass }`}
                    placeholder="Título del evento"
                    name="title"
                    value={ formValues.title }
                    onChange={ onInputChange }
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form> 
    </Modal>
  )
}
