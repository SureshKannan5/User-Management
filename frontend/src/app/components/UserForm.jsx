import { Form, Input } from "antd";
import CustomSelect from "./CustomSelect";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const UserForm = () => {
  return (
    <div>
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
                new Error("The two passwords that you entered do not match!")
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
    </div>
  );
};

export default UserForm;
