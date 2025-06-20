import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
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
    </div>
  );
};

export default HomePage;
