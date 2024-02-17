import { Table } from "antd";

const DataTable = ({ columns, dataSource }) => {
  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} />
  );
};

export default DataTable;
