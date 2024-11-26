export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  USER = 'USER',
}

export interface Role {
  id: number;
  name: string;
  uid: Roles; // ADMINISTRATOR, STAFF, USER
  extends?: number | null; // id of the role to be extended
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