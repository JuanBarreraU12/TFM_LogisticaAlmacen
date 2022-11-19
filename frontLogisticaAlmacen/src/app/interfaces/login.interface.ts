import { Employee } from "./employee.interface";
import { Rol } from "./rol.interface";

export interface Login {
  id?: number;
  username: string;
  password: string;
  rol: Rol;
  employee: Employee
}
