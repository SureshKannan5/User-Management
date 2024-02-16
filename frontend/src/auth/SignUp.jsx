import AuthLayout from "../layout/AuthLayout/Index";
import SideContainer from "../layout/AuthLayout/SideContent";
import { Layout, Col, Divider, Typography } from "antd";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import CustomSelect from "../app/components/CustomSelect";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

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
          <Form.Item
            label={"First Name"}
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={"Last Name"}
            name="surname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={"Email"}
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Organization"
            name={"organization"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <CustomSelect />
          </Form.Item>
          <Form.Item
            name="Password"
            label={"password"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="Confirm password"
            label={"confirmPassword"}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
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
