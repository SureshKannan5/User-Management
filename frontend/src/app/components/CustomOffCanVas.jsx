import { Button, Drawer, Form, Input, Space } from "antd";
import UserForm from "./UserForm";
import { useCreateOrganizationMutation } from "../../redux/services/adminApi";
import { pageNotifications } from "../util/helpers";

const CustomOffCanVas = ({ isOpen, title, onClose }) => {
  const [createOrganization] = useCreateOrganizationMutation();

  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await createOrganization(values).unwrap();

      pageNotifications.success("Organization created sucessfully");

      form.resetFields();
    } catch (error) {
      pageNotifications.error(error.data);
      console.log(error);
    }
  };

  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" onFinish={onSubmit}>
        {title === "Create a new Organization" ? (
          <>
            <Form.Item
              name="name"
              label="Company Name"
              rules={[
                {
                  required: true,
                  message: "Please enter company name",
                },
              ]}
            >
              <Input placeholder="Please enter company name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="please enter email" />
            </Form.Item>

            <Form.Item
              name="website"
              label="Website"
              rules={[
                {
                  required: true,
                  message: "Please enter url",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                placeholder="Please enter url"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </>
        ) : (
          <UserForm />
        )}

        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
export default CustomOffCanVas;
