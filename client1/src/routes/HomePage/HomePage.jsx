import { useContext } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./HomePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);

  return (
    <div className="HomePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            possimus deserunt autem quaerat sint qui aperiam mollitia ea rem
            sunt.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>69+</h1>
              <h2>Years Of Experience</h2>
            </div>
            <div className="box">
              <h1>690</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>6969+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/public/assets/pics/Urban Hive.gif" alt="" />
      </div>
    </div>
  );
}
export default HomePage;
