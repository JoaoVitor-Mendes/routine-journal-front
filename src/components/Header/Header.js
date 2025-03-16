import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';


const Header = () => {

  const navigate = useNavigate();
  const { isAuthenticated  } = useContext(AuthContext);

  const verifyAuth = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleListRoutines = () => {
    verifyAuth();
    navigate('/list-routines');
  };

  const handleHome = () => {
    verifyAuth();   
    navigate('/home');
  };
    
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Rotinas Diárias</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
            <Nav.Link onClick={handleListRoutines}>Listar Rotinas</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={handleLogout}>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;