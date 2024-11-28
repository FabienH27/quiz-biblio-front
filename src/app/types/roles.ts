export enum Roles {
  ADMINISTRATOR = 'ADMIN',
  USER = 'USER',
}

export interface Role {
  uid: Roles; // ADMINISTRATOR, STAFF, USER
}

export interface RoleResponse{
  roles: Role[];
}

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface SimpleUser{
  id: string;
  name: string;
  role: Roles;
}

export interface UserRoleResponse{
  role: string;
}