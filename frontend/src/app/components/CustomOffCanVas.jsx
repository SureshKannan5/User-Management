import { Button, Drawer, Form, Input, Space } from "antd";
import UserForm from "./UserForm";

const CustomOffCanVas = ({ isOpen, title, onClose }) => {
  return (
    <Drawer
      title={title}
      // width={720}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        {title === "Create a new Organization" ? (
          <>
            <Form.Item
              name="company"
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
                addonBefore="http://"
                addonAfter=".com"
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
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
export default CustomOffCanVas;
