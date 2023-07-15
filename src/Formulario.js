import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCard from './UserCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [preferencias, setPreferencias] = useState('');
  const [afiliacion, setAfiliacion] = useState('');
  const [showUserCard, setShowUserCard] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUser(null);

    const preferencesList = preferencias.split(',').map(Number);
    const evenPreferences = preferencesList.filter((preference) => preference % 2 === 0 || preference === 0);
    const oddPreferences = preferencesList.filter((preference) => preference % 2 !== 0);

    if (preferencesList.length === 0 || evenPreferences.length === 0 || oddPreferences.length === 0) {
        toast.error('Error: Deben haber al menos una par y otra impar');
        setShowUserCard(false);
        return;
    }

    const uniquePreferences = new Set(preferencesList);
    if (uniquePreferences.size !== preferencesList.length) {
        toast.error('Error: No se pueden repetir las preferencias');
        setShowUserCard(false);
        return;
    }

    const userData = {
      name: nombre,
      email: email,
      preferences: preferencesList,
      affiliate: afiliacion
    };

    try {
      console.log(JSON.stringify(userData))
      const response = await fetch('https://ingroupback.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (data) {
        if (data.error) {
            toast.error("Error en la petición: " + data.error);
            setShowUserCard(false);
            return;
        } else {
            setUser(data);
            setShowUserCard(true);
        }
      } else {
        toast.error('Error en la petición');
        setShowUserCard(false);
        return;
      }
    } catch (error) {
      toast.error('Error:', error);
      setShowUserCard(false);
      return;
    }
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className='my-3' controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group className='my-3' controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group className='my-3' controlId="preferencias">
            <Form.Label>Preferencias</Form.Label>
            <Form.Control
                type="text"
                placeholder="Ingresa tus preferencias"
                value={preferencias}
                onChange={(e) => setPreferencias(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group className='my-3' controlId="afiliacion">
            <Form.Label>Afiliación</Form.Label>
            <Form.Control
                type="text"
                placeholder="Ingresa tu afiliación"
                value={afiliacion}
                onChange={(e) => setAfiliacion(e.target.value)}
                required
            />
        </Form.Group>

        <Button className='my-3' variant="primary" type="submit">
            Enviar
        </Button>
        </Form>

        {showUserCard && user !== null && (
            <UserCard
                nombre={user.name}
                email={user.email}
                preferencias={user.preferences}
                afiliacion={user.affiliate}
            />
        )}

    </div>
  );
}

export default Formulario;
