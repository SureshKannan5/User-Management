import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import isEmpty from "lodash/isEmpty";

export const generateUserInfo = (token) => {
  const { userName, sub, role, access } = jwtDecode(token);

  return { userName, id: sub, role, access };
};

export const labelFormatter = (array, parameter, value, valueFromString) => {
  if (valueFromString) {
    return !isEmpty(array)
      ? array.map((data) => ({ label: data, value: data }))
      : [];
  }
  return !isEmpty(array)
    ? array.map((data) => ({
        label: data[parameter],
        value: data[value],
      }))
    : [];
};

export const pageNotifications = {
  success: (content) => {
    message.success(content, 2);
  },
  error: (content) => {
    message.error(content, 2);
  },
  warning: (content) => {
    message.warning(content, 2);
  },
};
