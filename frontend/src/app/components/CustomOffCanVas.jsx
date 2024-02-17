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
import { useEffect } from "react";
import {
  useLazyGetUserByIdQuery,
  useUpdateCurrentUserMutation,
} from "../../redux/services/userApi";
import { useSelector } from "react-redux";

const CustomOffCanVas = ({
  isOpen,
  title,
  onClose,
  selectedRow,
  action,
  setSelectedRow,
  setLoadPage,
}) => {
  const [createOrganization] = useCreateOrganizationMutation();

  const [getOrganizationInfo] = useLazyGetOrgnizationByIdQuery();

  const [getUserInfo] = useLazyGetUserByIdQuery();

  const [createUser] = useRegisterUserMutation();

  const [updateUserInfo] = useUpdateUserByIdMutation();

  const [updateOrganizationInfo] = useUpdateOrganizationByIdMutation();

  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  const [form] = Form.useForm();

  const { data } = useListRolesQuery();

  const { role } = useSelector((state) => state.auth.userInfo);

  const roleOptions = labelFormatter(data, "name", "_id");

  const isOrganizationAction = title.includes("Organization");

  const onCloseDrawer = () => {
    form.resetFields();
    setSelectedRow(() => null);
    onClose();
  };

  console.log("select", selectedRow);

  useEffect(() => {
    async function getDataById() {
      if (role === "user") {
        form.setFieldsValue(selectedRow);
        return;
      }
      if (selectedRow?._id) {
        const { _id } = selectedRow;
        try {
          if (isOrganizationAction) {
            const result = await getOrganizationInfo(_id).unwrap();
            form.setFieldsValue(result);
          } else {
            const result = await getUserInfo(_id).unwrap();
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
  }, [selectedRow]);

  const onSubmit = async (values) => {
    try {
      if (action === "create") {
        if (isOrganizationAction) await createOrganization(values).unwrap();
        else {
          await createUser(values).unwrap();
        }

        pageNotifications.success(
          `${
            isOrganizationAction ? "organization" : "user"
          } created sucessfully`
        );
        return;
      }

      onUpdateInfo(values);
      onCloseDrawer();
    } catch (error) {
      pageNotifications.error(error.data);
      console.log(error);
    }
  };

  const onUpdateInfo = async (values) => {
    try {
      if (isOrganizationAction)
        await updateOrganizationInfo({
          payload: values,
          id: selectedRow._id,
        }).unwrap();
      else {
        if (role === "user") {
          await updateCurrentUser(values);
        } else {
          await updateUserInfo({
            payload: values,
            id: selectedRow._id,
          }).unwrap();
        }
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
