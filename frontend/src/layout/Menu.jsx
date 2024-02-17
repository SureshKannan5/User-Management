import { UserAddOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const items = [
  {
    key: "organizations",
    icon: <ShopOutlined />,
    label: <Link to={"/organizations"}>Organizations</Link>,
  },
  {
    key: "users",
    icon: <UserAddOutlined />,
    label: <Link to={"/users"}>Users</Link>,
  },
];
const SideBar = () => {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

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
          items={items}
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
