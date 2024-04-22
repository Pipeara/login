import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav, Card } from 'react-bootstrap';
import { HiViewBoards, HiInbox, HiUser } from 'react-icons/hi';
import Context from '../contexts/Context';
import { ENDPOINT } from '../config/constans';
import '../components/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [firstName, setFirstName] = useState(getDeveloper?.firstName || '');
  const [lastName, setLastName] = useState(getDeveloper?.lastName || '');
  const [direction, setDirection] = useState(getDeveloper?.direction || '');
  const [email, setEmail] = useState('');

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => {
        setDeveloper({ ...user });
        setEmail(window.sessionStorage.getItem('email')); // Obtener y almacenar el correo electrónico del almacenamiento de sesión
      })
      .catch(error => {
        console.error('Error fetching developer data:', error);
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        navigate('/');
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const token = window.sessionStorage.getItem('token');
    axios.put(ENDPOINT.users, { firstName, lastName, direction }, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(error => {
        console.error('Error updating developer data:', error);
        window.alert('Error al actualizar la información del desarrollador.');
      });
  };

  useEffect(getDeveloperData, []);

  return (
    <div className="profile flex">
      <Container fluid>
        <Row>
          <Col md={3}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="#" className="d-flex align-items-center" style={{ color: '#fff' }}>
                <HiUser className="me-2" />
                Mi perfil
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center" style={{ color: '#fff' }}>
                <HiViewBoards className="me-2" />
                Mis Contratos
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center" style={{ color: '#fff' }}>
                <HiInbox className="me-2" />
                Mis Ordenes de Compra
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>
            <div className='profile-content py-3'>
              <h1 className="welcome">
              <h1 className="welcome">
          Bienvenido <span className='font-bold'>{getDeveloper?.firstName}</span> ({email})
</h1>

              </h1>
               {/* Mostrar el correo electrónico almacenado */}
              <Card className="custom-card">
                <Card.Body>
                  <Form onSubmit={handleFormSubmit} className="custom-form">
                    <Row className="justify-content-md-center">
                      <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Dirección" value={direction} onChange={(e) => setDirection(e.target.value)} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-start">
                        <Button variant="primary" type="submit">
                          Actualizar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
