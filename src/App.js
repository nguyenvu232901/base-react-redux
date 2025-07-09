import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
// Import API config test for development debugging
import './utils/testApiConfig';

const App = () => {
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container' />
        <div className='app-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
