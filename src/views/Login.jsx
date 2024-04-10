import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  
  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y contraseña son obligatorios.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      }

      // Si el inicio de sesión es exitoso, redireccionar al perfil
      navigate('/perfil');
    } catch (error) {
      console.error(error);
      window.alert('Ha ocurrido un error durante el inicio de sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1'>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1'>
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
