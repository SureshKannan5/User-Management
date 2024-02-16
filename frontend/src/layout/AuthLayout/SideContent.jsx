import { Space, Layout, Divider, Typography } from "antd";
import { logo } from "../../assets/Images";

const { Content } = Layout;
const { Title, Text } = Typography;

const SideContainer = () => {
  return (
    <Content
      style={{
        padding: "150px 30px 30px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
      className="sideContent"
    >
      <div style={{ width: "100%" }}>
        <img
          src={logo}
          alt="logo"
          style={{ margin: "0 auto 40px", display: "block" }}
          height={100}
          width={100}
        />
        <div className="space40"></div>
        <Title level={3}>Streamlined Organization Management with:</Title>
        <div className="space20"></div>
        <ul className="list-checked">
          <li className="list-checked-item">
            <Space direction="vertical">
              <Text>Manage organizations and users seamlessly</Text>
              <Text strong>Assign roles and privileges effortlessly</Text>
            </Space>
          </li>

          <li className="list-checked-item">
            <Space direction="vertical">
              <Text strong>Secure authentication with JWT tokens</Text>
              <Text>
                Define user roles and access levels for improved security
              </Text>
            </Space>
          </li>
        </ul>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        ></div>
      </div>
    </Content>
  );
};

export default SideContainer;
