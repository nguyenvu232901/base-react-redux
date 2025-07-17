import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    // Check if user logged in with Google
    const isGoogleUser = account?.access_token?.includes('google') ||
                        account?.access_token?.includes('mock_google') ||
                        account?.email?.includes('@gmail.com');

    if (isGoogleUser) {
      // Google logout - clear Google session
      try {
        // Clear Google OAuth session if available
        if (window.google?.accounts?.id) {
          window.google.accounts.id.disableAutoSelect();
        }
        toast.success('Google logout successful');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Google logout error:', error);
      }
    }

    // Redux logout
    dispatch(doLogout());
    toast.success('Logged out successfully');
    navigate('/');
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        {/* <Navbar.Brand href="/">Nguyen Vu Coder</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand'>
          Nguyen Vu Coder
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='/users' className='nav-link'>
              Users
            </NavLink>
            <NavLink to='/admins' className='nav-link'>
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className='btn-login' onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className='btn-signup' onClick={() => handleRegister()}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title={`Welcome ${account?.username || 'User'}`} id='basic-nav-dropdown'>
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
