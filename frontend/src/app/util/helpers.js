import { jwtDecode } from "jwt-decode";

export const generateUserInfo = (token) => {
  const { userName, sub, role, access } = jwtDecode(token);

  return { userName, id: sub, role, access };
};
