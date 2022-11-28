import { User_warehouse } from "./user_warehouses.interface";

export interface User {
    id?: number;
    username: string;
    password: string;

    rol_id: number;
    employee_id: number;
    warehouse_id: number;
    users_id: number;
    warehouses_id: number;
    users_warehouses: User_warehouse[];
}
