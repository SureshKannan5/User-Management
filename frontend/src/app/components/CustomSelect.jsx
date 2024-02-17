import { Select } from "antd";

const onSearch = (value) => {
  console.log("search:", value);
};

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CustomSelect = ({ options, placeholder, onChange }) => (
  <Select
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
  />
);
export default CustomSelect;
