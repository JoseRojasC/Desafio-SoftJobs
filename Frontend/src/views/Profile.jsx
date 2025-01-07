import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirigir al login si no hay token
      return;
    }

    axios
      .get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } }) // Asegúrate de que esta línea usa ENDPOINT.users
      .then(({ data }) => setDeveloper({ ...data }))
      .catch(() => {
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        navigate('/login');
      });
  };

  useEffect(getDeveloperData, []);

  return (
    <div className='py-5 text-center'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  );
};

export default Profile;
