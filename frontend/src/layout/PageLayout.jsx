import { Outlet } from "react-router-dom";
import SideBar from "./Menu";
import Layout from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";

const PageLayout = () => {
  return (
    <div className="main-content">
      <Layout hasSider>
        <SideBar />
        <Layout style={{ marginLeft: 200 }}>
          <Content
            style={{
              overflow: "initial",
              width: "100%",
              padding: "0 25px",
              maxWidth: 1200,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageLayout;
