export interface RegisterDto {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

export interface UserDto extends RegisterDto {
  id: string;
}

export interface EditDto {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  password?: string;
  repeatPassword?: string;
}
