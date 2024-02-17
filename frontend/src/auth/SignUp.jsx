import AuthLayout from "../layout/AuthLayout/Index";
import SideContainer from "../layout/AuthLayout/SideContent";
import { Layout, Col, Divider, Typography, Button } from "antd";
import { Form } from "antd";
import UserForm from "../app/components/UserForm";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const SignIn = () => {
  return (
    <AuthLayout sideContent={<SideContainer />}>
      <Content
        style={{
          padding: "10px 30px 30px",
          maxWidth: "440px",
          margin: "0 auto",
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <div />
        </Col>
        <Title level={1}>Register as Admin</Title>

        <Divider />
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
        >
          <UserForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Register
            </Button>

            <Link to="/login" className="me-2">
              Already have account
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </AuthLayout>
  );
};

export default SignIn;
