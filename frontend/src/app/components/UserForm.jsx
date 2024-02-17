import { Form, Input } from "antd";
import CustomSelect from "./CustomSelect";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useListOrganizationQuery } from "../../redux/services/adminApi";

const UserForm = () => {
  const { data } = useListOrganizationQuery({});

  const [form] = Form.useForm();

  const onSelectChange = (value) => {
    form.setFieldValue(value);
  };

  return (
    <div>
      <Form.Item
        label={"First Name"}
        name="firstName"
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
        name="lastName"
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
        <CustomSelect
          options={data}
          placeholder="Select organization"
          onChange={onSelectChange}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
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
        name="conform password"
        label={"Confirm Password"}
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
