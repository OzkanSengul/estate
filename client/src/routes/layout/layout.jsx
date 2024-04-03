import "./layout.scss";
import NavBar from "../../components/navbar/NavBar";
import HomePage from "../homePage/homePage";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
