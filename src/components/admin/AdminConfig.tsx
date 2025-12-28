import type { ColumnDef } from '@tanstack/react-table';
import config from '../../config';
// import type { Product } from '../../core/types/Product';

export interface MenuPoint {
    menuId: string;
    clickableText: string;
    title: string;
    columns: any[]; // The TanStack ColumnDef 
    data: any[];    // Your state or fetched data   
    removeURL: string;
    getDataURL: string;
    kind: string    
}

export const productColumns: ColumnDef<any>[] = [  
  {
    accessorKey: "imageurl",
    header: "Image",
    cell: ({ getValue }) => {
      const src = config.apiBaseUrl + getValue<string | undefined>();
      if (!src) return null;

      return (
        <img
          src={src}
          alt=""
          className="h-16 w-16 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
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
    {
    accessorKey: "imageurl",
    header: "Image",
    cell: ({ getValue }) => {
      const src = config.apiBaseUrl + getValue<string | undefined>();
      if (!src) return null;

      return (
        <img
          src={src}
          alt=""
          className="h-16 w-16 object-cover rounded"
        />
      );
    },
  },
  
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


export const menuArray: MenuPoint[] = [
     {
         menuId: 'm1',
        clickableText: "Produkter",
        title: "Administrer Produkter",
        columns: productColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/productlist",
        removeURL: config.apiBaseUrl + "/Admin/removeproduct/",
        kind: "Product",        
    }
      ,
     {
        menuId: 'm2',
        clickableText: "Ordrer",
        title: "Administrer Ordrer",
        columns: orderColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/orderlistnew",
        removeURL: config.apiBaseUrl + "/Admin/removeorder/",
        kind: "Order"
    }
   , 
     {
        menuId: 'm3',
        clickableText: "Medarbejdere",
        title: "Administrer Medarbejdere",
        columns: employeeColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Admin/employeelist",
        removeURL: config.apiBaseUrl + "/Admin/removeemployee/",
        kind: "Employee",      
    } ,
     {
        menuId: 'm4',
        clickableText: "Kategorier",
        title: "Administrer Kategorier",
        columns: productCategoryColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/productcategorylist",
        kind: "ProductCategory",
        removeURL: config.apiBaseUrl + "/Admin/removeproductcategory/"
    },
    {
        menuId: 'm5',
        clickableText: "Produkttyper",
        title: "Administrer Produkttyper",
        columns: productTypeColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/producttypelist",
        removeURL: config.apiBaseUrl + "/Admin/removeproducttype/",
        kind: "ProductType"
    },
    {
        menuId: 'm6',
        clickableText: "Mærkning",
        title: "Administrer Produktmærkninger",
        columns: productLabelColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/productlabellist",
        removeURL: config.apiBaseUrl + "/Admin/removeproductlabel/",
        kind: "ProductLabel"
    },
    {
        menuId: 'm7',
        clickableText: "Lokation",
        title: "Administrer lokationer",
        columns: locationColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Home/locationlist",
        removeURL: config.apiBaseUrl + "/Admin/removelocation/",
        kind: "Location"
    },
    {
        menuId: 'm8',
        clickableText: "Bil",
        title: "Administrer biler",
        columns: shopColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Admin/fishshoplist",
        removeURL: config.apiBaseUrl + "/Admin/removefishshop/",
        kind: "Shop"
    },
    {
        menuId: 'm9',
        clickableText: "Område",
        title: "Administrer områder",
        columns: areaColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Admin/operatingarealist",
        removeURL: config.apiBaseUrl + "/Admin/removeloperatingarea/",
        kind: "SalesArea"
    },
    {
        menuId: 'm10',
        clickableText: "Brugere",
        title: "Administrer brugere",
        columns: userColumns,
        data: [],
        getDataURL: config.apiBaseUrl + "/Login/userlist",
        removeURL: config.apiBaseUrl + "/Login/removeuser/",
        kind: "User"
    }  
] ; 
 