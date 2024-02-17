import { UserOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../redux/slices/authSlice";

const { Sider } = Layout;

const SideBar = () => {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const { role } = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutFromApp = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const items = [
    {
      key: "organizations",
      icon: <ShopOutlined />,
      label: <Link to={"/organizations"}>Organizations</Link>,
    },
    {
      key: "users-view",
      icon: <UserOutlined />,
      label: <Link to={"/users-view"}>Users</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <Link to={"#logout"} onClick={logoutFromApp}>
          Log Out
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === "/") {
          setCurrentPath("organizations");
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  return (
    <>
      <Sider
        className="navigation"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          bottom: "20px",
          background: "#fff",
          border: "none",
          top: "20px",
          borderRadius: "8px",
        }}
        theme={"light"}
      >
        <Menu
          items={role === "user" ? items.slice(1, 3) : items}
          mode="inline"
          theme={"light"}
          selectedKeys={[currentPath]}
          style={{
            background: "none",
            border: "none",
            padding: 10,
          }}
        />
      </Sider>
    </>
  );
};
export default SideBar;
