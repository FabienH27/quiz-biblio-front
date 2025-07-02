export enum Roles {
  ADMINISTRATOR = 'ADMIN',
  MEMBER = 'USER',
}

export interface Role {
  uid: Roles; // ADMINISTRATOR, MEMBER
}

export interface RoleResponse{
  roles: Role[];
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface UserRoleResponse{
  role: string;
}