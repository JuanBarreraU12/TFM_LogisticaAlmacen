export interface User {
    id?: number;
    name: string;
    first_last_name: string,
    second_last_name?: string,
    dni: string,
    phone?: string,
    birth_date?: Date,
    email: string,
    password: string;
    roleId: number;
    role?: string;
}
