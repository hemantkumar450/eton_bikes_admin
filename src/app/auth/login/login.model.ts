export interface UserModel {
  id: string;
  isSuperAdmin: string;
  token: string;
  images: Array<string>;
  role: any;
  permissions: Permission[];
}

export class LoginResponseModel {
  admin: UserModel;
  isSuperAdmin: string;
  token: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface Permission {
  description: string;
  group: string;
  icon: string;
  key: string;
  method: string;
  module_name: string;
  template_route: string;
}
