import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
import Context from '../contexts/Context';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
  email: '', // Deja el campo email vacío
  password: '' // Deja el campo password vacío
};

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { setDeveloper } = useContext(Context);

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorios.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    axios
      .post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem('token', data.token); // Guardar el token
        window.alert('Usuario identificado con éxito 😀.');
        setDeveloper(data); // Guardar los datos del usuario en el contexto
        navigate('/perfil'); // Redirigir al perfil
      })
      .catch(({ response }) => {
        const errorMessage = response?.data?.message || 'Ocurrió un error';
        window.alert(`${errorMessage} 🙁.`);
      });
  };

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
  );
};

export default Login;
