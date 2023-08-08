import { useForm } from '../../hook/';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css';


const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
};

export const LoginPage = () => {

    const {
        loginEmail,
        loginPassword,
        onInputChange: OnLoginInputChange,
        // formState: loginUser
    } = useForm(loginFormFields);
   
    const { 
        onInputChange: OnRegisterInputChange,
        registerEmail,
        registerName,
        registerPassword,
        registerPassword2,
        // formState: registerUser
    } = useForm(registerFormFields);

    const { loginSubmit, registerSubmit, titleclass } = useLogin(
        loginEmail, 
        loginPassword, 
        registerName, 
        registerEmail,
        registerPassword,
        registerPassword2,
    )

    return (
        <div className="container login-container">
            <div className="row">
                {/* LOGIN */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={OnLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={OnLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
                {/* LOGIN */}

                {/* REGISTER */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={OnRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={OnRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={OnRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${titleclass}`} // parte de prueba - validacion
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={OnRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
                {/* REGISTER */}

            </div>
        </div>
    )
}
