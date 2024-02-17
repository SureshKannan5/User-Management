import { Button, Drawer, Form, Input, Space } from "antd";
import UserForm from "./UserForm";
import {
  useCreateOrganizationMutation,
  useLazyGetOrgnizationByIdQuery,
  useListRolesQuery,
  useRegisterUserMutation,
  useUpdateOrganizationByIdMutation,
  useUpdateUserByIdMutation,
} from "../../redux/services/adminApi";
import { labelFormatter, pageNotifications } from "../util/helpers";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useLazyGetUserByIdQuery } from "../../redux/services/userApi";

const CustomOffCanVas = ({
  isOpen,
  title,
  onClose,
  selectedRowId,
  action,
  setSelectedRow,
}) => {
  const [createOrganization] = useCreateOrganizationMutation();

  const [getOrganizationInfo] = useLazyGetOrgnizationByIdQuery();

  const [getUserInfo] = useLazyGetUserByIdQuery();

  const [createUser] = useRegisterUserMutation();

  const [updateUserInfo] = useUpdateUserByIdMutation();

  const [updateOrganizationInfo] = useUpdateOrganizationByIdMutation();

  const [form] = Form.useForm();

  const { data } = useListRolesQuery();

  const roleOptions = labelFormatter(data, "name", "_id");

  const isOrganizationAction = title.includes("Organization");

  const onCloseDrawer = () => {
    form.resetFields();
    setSelectedRow(null);

    onClose();
  };

  useEffect(() => {
    async function getDataById() {
      if (selectedRowId) {
        try {
          if (isOrganizationAction) {
            const result = await getOrganizationInfo(selectedRowId).unwrap();
            form.setFieldsValue(result);
          } else {
            const result = await getUserInfo(selectedRowId).unwrap();
            form.setFieldsValue(result);
            form.setFieldValue("organization", result.organization._id);
            form.setFieldValue("role", result.role._id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    getDataById();
  }, [selectedRowId]);

  const onSubmit = async (values) => {
    const adminObject =
      !isEmpty(data) && data.find((role) => role.name === "admin");
    try {
      if (action === "create") {
        if (isOrganizationAction) await createOrganization(values).unwrap();
        else {
          await createUser({ ...values, role: adminObject._id }).unwrap();
        }

        pageNotifications.success(
          `${
            isOrganizationAction ? "organization" : "user"
          } created sucessfully`
        );
        return;
      }

      onUpdateInfo(values);

      form.resetFields();
      onClose();
    } catch (error) {
      pageNotifications.error(error.data);
      console.log(error);
    }
  };

  const onUpdateInfo = async (values) => {
    try {
      console.log(selectedRowId, values);
      if (isOrganizationAction)
        await updateOrganizationInfo({
          payload: values,
          id: selectedRowId,
        }).unwrap();
      else {
        await updateUserInfo({
          payload: values,
          id: selectedRowId,
        }).unwrap();
      }

      pageNotifications.success(
        `${isOrganizationAction ? "organization" : "user"} updated sucessfully`
      );
    } catch (error) {
      pageNotifications.error(error.data);
      console.log(error);
    }
  };

  return (
    <Drawer
      title={title}
      onClose={onCloseDrawer}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          remember: true,
        }}
        form={form}
      >
        {isOrganizationAction ? (
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
          <UserForm roleOptions={roleOptions} action={action} />
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
