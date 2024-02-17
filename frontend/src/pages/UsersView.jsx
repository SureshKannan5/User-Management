import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import CustomOffCanVas from "../app/components/CustomOffCanVas";
import { useEffect, useState } from "react";
import {
  useDeleteUserByIdMutation,
  useLazyGetUserProfileQuery,
  useLazyListAllUsersQuery,
} from "../redux/services/userApi";
import { useSelector } from "react-redux";
import DeleteModal from "../app/components/DeleteModal";
import { pageNotifications } from "../app/util/helpers";

const { Title } = Typography;

const UsersView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [action, setAction] = useState("create");

  const [loadPage, setLoadPage] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    userInfo: { role },
  } = useSelector((state) => state.auth);

  const showDrawer = () => {
    setAction("create");
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const [getAllUsersQuery, { data: allUsers }] = useLazyListAllUsersQuery();

  const [getCurrentUserProfile, { data }] = useLazyGetUserProfileQuery();

  const [deleteUser] = useDeleteUserByIdMutation();

  const isAdminView = role === "admin";

  useEffect(() => {
    if (role !== "") {
      if (isAdminView) {
        getAllUsersQuery();
      } else if (role === "user") {
        getCurrentUserProfile();
      }
    }
  }, [role, loadPage, isAdminView, getAllUsersQuery, getCurrentUserProfile]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },

    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Organization",
      // dataIndex: "organization.name",
      render: (cell) =>
        isAdminView ? cell?.organization?.name : cell?.organization,

      key: "organization",
    },
    {
      title: "User Role",
      render: (cell) => (isAdminView ? cell?.role?.name : cell?.role),
      key: "role",
    },
  ];

  const onEditRow = (record) => {
    setAction("update");
    console.log(record);
    setSelectedRow(() => record);
    setIsOpen(true);
  };

  const onDeletedRow = (record) => {
    setSelectedRow(() => record);
    setModalOpen(true);
  };

  const hideModal = () => setModalOpen(() => false);

  const handleDelete = async () => {
    try {
      await deleteUser(selectedRow._id).unwrap();

      pageNotifications.success("User deleted sucessfully");
      setLoadPage((state) => !state);
    } catch (error) {
      console.log(error.data.message);
      pageNotifications.error(error.data.message);
    } finally {
      setModalOpen(() => false);
      setSelectedRow(() => null);
    }
  };
  return (
    <>
      {isOpen && (
        <CustomOffCanVas
          title={action === "create" ? "Create a new user" : "Update user"}
          isOpen={isOpen}
          onClose={onCloseDrawer}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          action={action}
          setLoadPage={setLoadPage}
        />
      )}

      <DeleteModal
        open={modalOpen}
        content={"Are you sure you want delete user?"}
        handleDelete={handleDelete}
        hideModal={hideModal}
      />
      <div className="home_page_container">
        <Content
          className="whiteBox shadow layoutPadding"
          style={{
            margin: "30px auto",
            width: "100%",
            maxWidth: "100%",
            // flex: "none",
          }}
        >
          <div className="table-header">
            {" "}
            <Title level={4}>User Details</Title>
            {isAdminView && (
              <div className="action_container">
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={() => showDrawer("Create a new user")}
                >
                  Add User
                </Button>
              </div>
            )}
          </div>

          <DataTable
            columns={columns}
            dataSource={isAdminView ? allUsers : [data]}
            actions={{
              onEdit: onEditRow,
              onDelete: isAdminView && onDeletedRow,
            }}
          />
        </Content>
      </div>
    </>
  );
};

export default UsersView;
