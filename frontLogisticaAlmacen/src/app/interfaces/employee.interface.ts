import { Rol } from "./rol.interface";
import { Warehouse } from "./warehouse.interface";

export interface Employee {
    id?: number;
    name: string;   
    first_last_name: string;
    second_last_name: string;
    email: string;
    dni: string;
    cell_phone: number;
    birth_date: string;
    rol: Rol;
    warehouse: Warehouse;
}
