import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Component/Layouts/Header";
import axios from "./utils/axious.Customize";
import { useContext, useEffect } from "react";
import logo from "./assets/logo white color.png";
import { Contact } from "./Component/Context/GlobalContext";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const FetchApi = async () => {
      let res = await axios.get(`/v1/api/users`);
      console.log("check back end : ", res);
    };
    FetchApi();
  }, []);
  const { isAuthenticated, setIsAuthenticated } = useContext(Contact);
  const checkapper = localStorage.getItem("userId");

  return (
    <>
      <div>
        <div
          className="Header-Page d-flex align-items-center justify-content-between py-2"
          style={{ background: "#064420" }}
        >
          <div className="ps-3 d-flex align-items-center">
            <div
              className="Logo-photo"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={logo}
              />
            </div>
            <div style={{ width: "30rem" }}>
              <Header />
            </div>
          </div>
          {checkapper ? (
            <div className="pe-3">
              <button
                className="btn"
                onClick={() => {
                  navigate("/Auth");
                  localStorage.clear("userId");
                }}
                style={{
                  background: "white",
                  color: "#FFCC00",
                  border: "0.2px solid white",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pe-3">
              <button
                className="btn btn-success mx-2"
                style={{
                  background: "white",
                  color: "#064420",
                  border: "0.2px solid white",
                }}
                onClick={() => {
                  navigate("/Auth");
                  localStorage.clear("userId");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-success"
                style={{
                  background: "#064420",
                  color: "white",
                  border: "0.2px solid white",
                }}
                onClick={() => {
                  navigate("/Auth/register");
                  localStorage.clear("userId");
                }}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
        <div style={{ width: "100%" }}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
