import AuthLayout from "../layout/AuthLayout/Index";
import SideContainer from "../layout/AuthLayout/SideContent";
import { Layout, Col, Divider, Typography } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/baseApiSetup";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthToken, setUserInfo } from "../redux/slices/authSlice";
import { generateUserInfo } from "../app/util/helpers";

const { Content } = Layout;
const { Title } = Typography;

const SignIn = () => {
  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { token } = await login(values).unwrap();

      sessionStorage.setItem("auth-token", token);

      const userInformation = generateUserInfo(token);
      sessionStorage.setItem("currentUserRole", userInformation.role);

      dispatch(setUserAuthToken({ token }));

      dispatch(setUserInfo(userInfo, userInformation));
      navigate(
        userInformation.role === "user" ? "/users-view" : "/organizations"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout sideContent={<SideContainer />}>
      <Content
        style={{
          padding: "80px 30px 30px",
          maxWidth: "440px",
          margin: "0 auto",
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <div className="space10" />
        </Col>
        <Title level={1}>SignIn</Title>

        <Divider />
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
              type="email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Log In
            </Button>

            <Link to={"/register"}>{"Register Now!"}</Link>
          </Form.Item>
        </Form>
      </Content>
    </AuthLayout>
  );
};

export default SignIn;
