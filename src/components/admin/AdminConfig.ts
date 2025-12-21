import type { ColumnDef } from '@tanstack/react-table';

// Example for Products
export const productColumns: ColumnDef<any>[] = [
    { accessorKey: 'name', header: 'Produkt' },
    { accessorKey: 'price', header: 'Pris' },
    { accessorKey: 'discount', header: 'Rabat' },
];

// Example for Employees
export const employeeColumns: ColumnDef<any>[] = [
    { accessorKey: 'name', header: 'Medarbejder' },
    { accessorKey: 'role', header: 'Rolle' },
];