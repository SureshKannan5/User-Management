import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import CustomOffCanVas from "../app/components/CustomOffCanVas";
import { useState } from "react";
import { useListAllUsersQuery } from "../redux/services/userApi";

const { Title } = Typography;

const UsersView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState({});

  const [action, setAction] = useState("create");

  const showDrawer = () => {
    setAction("create");
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const { data: allUsers } = useListAllUsersQuery({});

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
      render: (cell) => cell.organization.name,
      key: "organization.name",
    },
    {
      title: "User Role",
      render: (cell) => cell.role.name,
      key: "role.name",
    },
  ];

  const onEditRow = (record) => {
    setAction("update");
    setSelectedRow(() => record._id);
    setIsOpen(true);
  };

  const onDeletedRow = (record) => {
    setSelectedRow(() => record);
  };
  return (
    <>
      {isOpen && (
        <CustomOffCanVas
          title={action === "create" ? "Create a new user" : "Update user"}
          isOpen={isOpen}
          onClose={onCloseDrawer}
          selectedRowId={selectedRow}
          setSelectedRow={setSelectedRow}
          action={action}
        />
      )}
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
            <div className="action_container">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => showDrawer("Create a new user")}
              >
                Add User
              </Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            dataSource={allUsers}
            actions={{ onEdit: onEditRow, onDelete: onDeletedRow }}
          />
        </Content>
      </div>
    </>
  );
};

export default UsersView;
