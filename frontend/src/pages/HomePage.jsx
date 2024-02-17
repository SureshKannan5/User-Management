import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Typography } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import CustomOffCanVas from "../app/components/CustomOffCanVas";
import { useEffect, useState } from "react";
import {
  useDeleteOrganizationByIdMutation,
  useListOrganizationMutation,
} from "../redux/services/adminApi";
import CustomSelect from "../app/components/CustomSelect";
import { useListMetaOrganizationsQuery } from "../redux/services/userApi";
import DeleteModal from "../app/components/DeleteModal";
import { pageNotifications } from "../app/util/helpers";

const { Title } = Typography;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [action, setAction] = useState("create");

  const [loadPage, setLoadPage] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const showDrawer = () => {
    setAction("create");
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const [getFilteredOrganizations, { data }] = useListOrganizationMutation();

  const { data: organizationOptions } = useListMetaOrganizationsQuery({});

  const [deleteOrganization] = useDeleteOrganizationByIdMutation();

  useEffect(() => {
    getFilteredOrganizations({ organization: [] });
  }, [loadPage, getFilteredOrganizations]);

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
    {
      title: "User count",
      dataIndex: "userCount",
      key: "userCount",
    },
  ];

  const onEditRow = (record) => {
    setAction("update");
    setSelectedRow(() => record);
    setIsOpen(true);
  };

  const onDeletedRow = (record) => {
    setSelectedRow(() => record);
    setModalOpen(true);
  };

  const onSelectChange = (selectedValue) => {
    getFilteredOrganizations({ organization: selectedValue });
  };

  const hideModal = () => setModalOpen(() => false);

  const handleDelete = async () => {
    try {
      await deleteOrganization(selectedRow._id).unwrap();

      pageNotifications.success("Organization deleted sucessfully");
      setModalOpen(() => false);
      setSelectedRow(() => null);
      setLoadPage((state) => !state);
    } catch (error) {
      console.log(error);
      pageNotifications.error("Delete action failed");
    }
  };

  return (
    <>
      <DeleteModal
        open={modalOpen}
        content={"Are you sure you want delete organization"}
        handleDelete={handleDelete}
        hideModal={hideModal}
      />
      {isOpen && (
        <CustomOffCanVas
          title={
            action === "create"
              ? "Create a new Organization"
              : "Update Organization"
          }
          isOpen={isOpen}
          action={action}
          onClose={onCloseDrawer}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setLoadPage={setLoadPage}
        />
      )}
      <div className="home_page_container">
        <Content
          className="whiteBox shadow layoutPadding"
          style={{
            margin: "30px auto",
            width: "100%",
            maxWidth: "100%",
            flex: "none",
          }}
        >
          <div className="table-header">
            {" "}
            <Title level={4}>Organization Details</Title>
            <div className="action_container">
              <Button
                type="primary"
                icon={<ShopOutlined />}
                onClick={showDrawer}
              >
                Add Organization
              </Button>
            </div>
          </div>
          <CustomSelect
            options={organizationOptions}
            placeholder="Select organization"
            onChange={onSelectChange}
            mode="multiple"
            allowClear
            style={{
              width: "50%",
              marginBottom: "20px",
            }}
          />

          <DataTable
            columns={columns}
            dataSource={data || []}
            actions={{ onEdit: onEditRow, onDelete: onDeletedRow }}
          />
        </Content>
      </div>
    </>
  );
};

export default HomePage;
