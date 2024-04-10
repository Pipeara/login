import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
  name: '',
  lastname: '',
  email: '',
  rut: '',
  password: '',
  confirmPassword: '',
  direction: '',
  discapacidad: false,
  descripcion_discapacidad: ''
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    // Validación de campos
    if (
      !user.name.trim() ||
      !user.lastname.trim() ||
      !user.email.trim() ||
      !user.rut.trim() ||
      !user.password.trim() ||
      !user.direction.trim() ||
      !user.confirmPassword.trim()
    ) {
      return window.alert('Todos los campos son obligatorios.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    if (user.password !== user.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    console.log('Enviando datos al backend...');

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      window.alert('Usuario registrado con éxito 😀.');
      navigate('/login');
    } catch (error) {
      console.error(error.message);
      window.alert(`${error.message} 🙁.`);
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil');
    }
  }, []);

  return (
    <form onSubmit={handleForm} className='form-container mt-5'>
      <h1>Registrar nuevo usuario</h1>
      <hr />
      <div className='form-group mt-3'>
        <input
          value={user.name}
          onChange={handleUser}
          type='text'
          name='name'
          className='form-control mb-3'
          placeholder='Nombre'
        />
      </div>
      <div className='form-group mt-3'>
        <input
          value={user.lastname}
          onChange={handleUser}
          type='text'
          name='lastname'
          className='form-control mb-3'
          placeholder='Apellido'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control mb-3'
          placeholder='Correo electrónico'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.rut}
          onChange={handleUser}
          type='text'
          name='rut'
          className='form-control mb-3'
          placeholder='RUT'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control mb-3'
          placeholder='Contraseña'
        />
      </div>
      <div className='form-group'>
        <input
          value={user.confirmPassword}
          onChange={handleUser}
          type='password'
          name='confirmPassword'
          className={`form-control mb-3 ${passwordMismatch ? 'is-invalid' : ''}`}
          placeholder='Confirmar Contraseña'
        />
        {passwordMismatch && <div className="invalid-feedback">Las contraseñas no coinciden</div>}
      </div>
      <div className='form-group'>
        <input
          value={user.direction}
          onChange={handleUser}
          type='text'
          name='direction'
          className='form-control mb-3'
          placeholder='Dirección'
        />
      </div>
      <div className='form-group'>
        <input
          type='checkbox'
          name='discapacidad'
          checked={user.discapacidad}
          onChange={(event) => setUser({ ...user, discapacidad: event.target.checked })}
        />
        <label htmlFor='discapacidad' className='ml-2'>¿Tiene alguna discapacidad?</label>
      </div>
      {user.discapacidad && (
        <div className='form-group'>
          <input
            value={user.descripcion_discapacidad}
            onChange={handleUser}
            type='text'
            name='descripcion_discapacidad'
            className='form-control mb-3'
            placeholder='Descripción de la discapacidad'
          />
        </div>
      )}
      <button type='submit' className='btn btn-light mt-3'>
        Registrarme
      </button>
    </form>
  );
};

export default Register;
