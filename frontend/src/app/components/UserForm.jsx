import { Form, Input } from "antd";
import CustomSelect from "./CustomSelect";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useListMetaOrganizationsQuery } from "../../redux/services/userApi";
import { useSelector } from "react-redux";

const UserForm = ({ roleOptions, action }) => {
  const { data } = useListMetaOrganizationsQuery({});

  const [form] = Form.useForm();

  const { role } = useSelector((state) => state.auth.userInfo);

  const onSelectChange = (value) => {
    form.setFieldValue(value);
  };

  const isUpdateAction = action === "update";

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
      {role !== "user" && (
        <>
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
          {roleOptions && (
            <Form.Item
              label="Role"
              name={"role"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <CustomSelect
                options={roleOptions}
                placeholder="Select organization"
                onChange={onSelectChange}
              />
            </Form.Item>
          )}
        </>
      )}

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: isUpdateAction ? false : true,
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
            required: isUpdateAction ? false : true,
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
