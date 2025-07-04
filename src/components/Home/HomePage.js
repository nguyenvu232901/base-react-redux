import videoHomepage from '../../assets/video-homepage.mp4';
// import { useSelector } from 'react-redux';

const HomePage = () => {
  // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // const account = useSelector(state => state.user.account);

  // console.log('account: ', account, ' isAuthenticated: ', isAuthenticated);

  return (
    <div className='homepage-container'>
      <video autoPlay loop muted>
        <source src={videoHomepage} type='video/mp4' />
      </video>
      <div className='homepage-content'>
        <div className='title'>There is a better way to ask</div>
        <div className='description'>
          You don t want to make a boring form. And your audience won t answer
          one. Create a typeform instead-and make everyone happy.
        </div>
        <div className='btn-content'>
          <button>Get started. It s free</button>
        </div>
      </div>

      <div className='count-content' />
    </div>
  );
};

export default HomePage;
