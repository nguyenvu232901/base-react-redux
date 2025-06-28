import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector, useDispatch } from "react-redux";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  console.log("account: ", account, " isAuthenticated: ", isAuthenticated);

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title">There's a better way to ask</div>
        <div className="description">
          You dont't want to make a boring form. And your audience wont't answer
          one. Create a typeform instead-and make everyone happy.
        </div>
        <div className="btn-content">
          <button>Get's started. It's free</button>
        </div>
      </div>

      <div className="count-content"></div>
    </div>
  );
};

export default HomePage;
