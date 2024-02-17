import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Typography, Space } from "antd";
import { UserAddOutlined, ShopOutlined } from "@ant-design/icons";
import CustomOffCanVas from "../app/components/CustomOffCanVas";
import { useState } from "react";
import { useListOrganizationQuery } from "../redux/services/adminApi";

const { Title } = Typography;

const HomePage = () => {
  const [title, setTitle] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const showDrawer = (title) => {
    setTitle(() => title);
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const { data: listOrganizations } = useListOrganizationQuery({});

  const columns = [
    {
      title: "Comapany",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
  ];

  console.log("data", listOrganizations);

  return (
    <>
      {isOpen && (
        <CustomOffCanVas
          title={title}
          isOpen={isOpen}
          onClose={onCloseDrawer}
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
            <Title level={4}>Organization Details</Title>
            <div className="action_container">
              <Space>
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={() => showDrawer("Create a new user")}
                >
                  Add User
                </Button>

                <Button
                  type="primary"
                  icon={<ShopOutlined />}
                  onClick={() => showDrawer("Create a new Organization")}
                >
                  Add Organization
                </Button>
              </Space>
            </div>
          </div>

          <DataTable columns={columns} dataSource={listOrganizations} />
        </Content>
      </div>
    </>
  );
};

export default HomePage;
