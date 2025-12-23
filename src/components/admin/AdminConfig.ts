import type { ColumnDef } from '@tanstack/react-table';

// Products
export const productColumns: ColumnDef<any>[] = [


    { accessorKey: 'name', header: 'Produkt' },
    { accessorKey: 'productnumber', header: 'Nr.' },
    { accessorKey: 'description', header: 'Beskrivelse' },
    { accessorKey: 'price', header: 'Pris' },

];

// Employees
export const employeeColumns: ColumnDef<any>[] = [
    { accessorKey: 'name', header: 'Medarbejder' },
    { accessorKey: 'phone', header: 'Telefon' },
    { accessorKey: 'email', header: 'Email' },
];

// Orders
export const orderColumns: ColumnDef<any>[] = [
    { accessorKey: 'customerorderCode', header: 'Bestillingsnummer' },
    { accessorKey: 'deliveryDate', header: 'Leveringsdato' },
    { accessorKey: 'customerName', header: 'Kunde' },
];

// product categories
export const productCategoryColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'categoryname', header: 'Kategori' },
];

// product types
export const productTypeColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'name', header: 'Type' },
];

// product label (mærkning)
export const productLabelColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'labelname', header: 'Mærkning' },
    { accessorKey: 'imageurl', header: 'Image' },
];

// sales location
export const locationColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'locationname', header: 'Lokation' },
    { accessorKey: 'address', header: 'Image' },
    { accessorKey: 'latitude', header: 'Breddegrad' },
    { accessorKey: 'longitude', header: 'Længdegrad' },
];

// Shop or Truck 
export const shopColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'name', header: 'Mærkning' },    
];

// Sales area 
export const areaColumns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'name', header: 'Mærkning' },    
];

// user
export const userColumns: ColumnDef<any>[] = [    
    { accessorKey: 'username', header: 'Brugernavn' },   
     { accessorKey: 'displayname', header: 'Navn' } 
];

