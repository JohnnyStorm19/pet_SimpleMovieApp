import { IRole } from "../model/types.interface";

export const getAllRoles = (rolesArray: IRole[]) => {
  return rolesArray.map((role) => role.character).join("/");
};
