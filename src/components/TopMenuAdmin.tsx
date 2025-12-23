import React, { useState, useEffect } from 'react';
import { AdminEntityView } from './admin/AdminEntityView';
import {
    productColumns, orderColumns, employeeColumns, productCategoryColumns, productTypeColumns, userColumns,
    productLabelColumns, locationColumns, shopColumns, areaColumns
} from './admin/AdminConfig';

import config from '../config';
import { get, remove } from "../core/api/axiosHttpClient";
import type { Employee } from '../core/types/Employee';
import type { Product } from '../core/types/Product';

import EmployeeCreateEdit from './admin/EmployeeCreateEdit';
import AdminProductCreateEdit from './admin/AdminProductCreateEdit';
import AdminOrders from '../pages/Administration/AdminOrders';
import AdminProductCategoryCreateEdit from './admin/AdminProductCategoryCreateEdit';
import AdminProductTypeCreateEdit from './admin/AdminProductTypeCreateEdit';
import AdminProductLabelCreateEdit from './admin/AdminProductLabelCreateEdit';
import AdminPlaceCreateEdit from './admin/AdminPlaceCreateEdit';
import FishShopCreateEdit from './admin/FishShopCreateEdit';
import OperatingAreaCreateEdit from './admin/OperatingAreaCreateEdit';
import RegisterUser from './admin/RegisterUser';

interface MenuPoint {
    menuId: string;
    clickableText: string;
    title: string;
    columns: any[]; // The TanStack ColumnDef 
    data: any[];    // Your state or fetched data   
    removeURL : string;
    kind: string
}

const TopMenuAdmin: React.FC = () => {
    // 1. In a real app, you would fetch these from your context/API
    const [products, setProducts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [productLabels, setProductLabels] = useState([]);
    const [saleLocations, setSaleLocations] = useState([]);
    const [shops, setShops] = useState([]);
    const [areas, setAreas] = useState([]);
    const [users, setUsers] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get("/Home/productlist");
                setProducts(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchProducts();

        const fetchProductCategories = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get("/Home/productcategorylist");
                setProductCategories(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchProductCategories();

        const fetchProductTypes = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get("/Home/producttypelist");
                setProductTypes(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchProductTypes();

        const fetchProductLabels = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get("/Home/productlabellist");
                setProductLabels(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchProductLabels();

        const fetchLocations = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get('/Home/locationlist');
                setSaleLocations(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchLocations();

        const fetchShops = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get('/Admin/fishshoplist');
                setShops(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchShops();

        const fetchArea = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get('/Admin/operatingarealist');
                setAreas(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchArea();

        const fetchUsers = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get('/Login/userlist');
                setUsers(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchUsers();

        const fetchOrders = async () => {
            try {

                //const response = await getWithKind<Product, "Product">("/Home/productlist", "Product");
                const response: any = await get('/Home/orderlistnew');
                setOrders(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchOrders();

        const fetchEmployees = async () => {
            try {
                // const response  = await get<Employee[]>('/Admin/employeelist');

                // const response = await getWithKind<Employee, "Employee">("/Admin/employeelist", "Employee");

                const response: any = await get("/Admin/employeelist");

                setEmployees(response)
            } catch (err) {
                setError('Failed to load employess');
            }
        };
        fetchEmployees();

    }, []);

    // 2. Define your menu items as data objects
    const menuArray: MenuPoint[] = [
        {
            menuId: 'm1',
            clickableText: "Produkter",
            title: "Administrer Produkter",
            columns: productColumns,
            data: products,
            removeURL : config.apiBaseUrl + "/Admin/removeproduct/",
            kind: "Product"
        },
        {
            menuId: 'm2',
            clickableText: "Ordrer",
            title: "Administrer Ordrer",
            columns: orderColumns,
            data: orders,
             removeURL : config.apiBaseUrl + "/Admin/removeorder/",
            kind: "Order"
        },
        {
            menuId: 'm3',
            clickableText: "Medarbejdere",
            title: "Administrer Medarbejdere",
            columns: employeeColumns,
            data: employees,
             removeURL : config.apiBaseUrl + "/Admin/removeemployee/",
            kind: "Employee"
        },
        {
            menuId: 'm4',
            clickableText: "Kategorier",
            title: "Administrer Kategorier",
            columns: productCategoryColumns,
            data: productCategories,
            kind: "ProductCategory",
            removeURL : config.apiBaseUrl + "/Admin/removeproductcategory/"
        },
        {
            menuId: 'm5',
            clickableText: "Produkttyper",
            title: "Administrer Produkttyper",
            columns: productTypeColumns,
            data: productTypes,
             removeURL : config.apiBaseUrl + "/Admin/removeproducttype/",
            kind: "ProductType"
        },
        {
            menuId: 'm6',
            clickableText: "Mærkning",
            title: "Administrer Produktmærkninger",
            columns: productLabelColumns,
            data: productLabels,
             removeURL : config.apiBaseUrl + "/Admin/removeproductlabel/",
            kind: "ProductLabel"
        },
        {
            menuId: 'm7',
            clickableText: "Lokation",
            title: "Administrer lokationer",
            columns: locationColumns,
            data: saleLocations,
             removeURL : config.apiBaseUrl + "/Admin/removelocation/",
            kind: "Location"
        },
        {
            menuId: 'm8',
            clickableText: "Bil",
            title: "Administrer biler",
            columns: shopColumns,
            data: shops,
             removeURL : config.apiBaseUrl + "/Admin/removefishshop/",
            kind: "Shop"
        },
        {
            menuId: 'm9',
            clickableText: "Område",
            title: "Administrer områder",
            columns: areaColumns,
            data: areas,
             removeURL : config.apiBaseUrl + "/Admin/removeloperatingarea/",
            kind: "SalesArea"
        },
        {
            menuId: 'm10',
            clickableText: "Brugere",
            title: "Administrer brugere",
            columns: userColumns,
            data: users,
             removeURL : config.apiBaseUrl + "/Login/removeuser/",
            kind: "User"
        }
    ];

    const [selectedMenu, setSelectedMenu] = useState<MenuPoint>(menuArray[0]);
    const [selectedKind, setSelectedKind] = useState("");
    const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

    // 3. Handlers for the buttons inside AdminEntityView
    //  const handleEdit = (item: any) => console.log("Editing:", item);

    function handleEdit(item: Employee | Product | null) {

        setSelectedKind(selectedMenu.kind)
        setSelectedEntity(item)
    }

    const removeItem = async (item : any) => {
        try {
            const removeUrl = 
            await remove(selectedMenu.removeURL + item.id)
        } catch (error) {
            setError('Fejl');
            console.error(error);
        } finally {

        }
    }


    function handleDelete(item: any) {
        removeItem(item);
    }


    function handleSelectedMenu(menuPoint: MenuPoint) {
        setSelectedMenu(menuPoint);
    }



    const handleClose = () => {
        setSelectedKind("");

    };

    return (
        <>
            <div className="flex flex-col bg-primaryBackgroundColor">
                <div className="flex items-center">
                    <div className="flex-1 p-4">
                        <img src="/images/jjfisk_logo.svg" alt="Logo" width={100} />
                    </div>

                    <div className="flex-5 p-4">
                        <div className="grid grid-cols-10 gap-2 text-center">
                            {menuArray.map((menuPoint) => (
                                <div
                                    key={menuPoint.menuId}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenu.menuId === menuPoint.menuId
                                        ? 'text-hoverMenuActionsColor font-bold'
                                        : 'text-primaryTextColor'
                                        }`}
                                    onClick={() => handleSelectedMenu(menuPoint)}
                                >
                                    {menuPoint.clickableText}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1" />
                </div>
            </div>

            {/* 4. This one component now handles ALL 10 menu points */}
            <div className="p-8">
                {selectedMenu.kind !== "Order" &&
                    <AdminEntityView
                        title={selectedMenu.title}
                        data={selectedMenu.data}
                        columns={selectedMenu.columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />}
            </div>

            <div>

                {selectedKind === "Employee" && < EmployeeCreateEdit isOpen={true} employeeToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "Product" && < AdminProductCreateEdit isOpen={true} productToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "ProductCategory" && < AdminProductCategoryCreateEdit isOpen={true} productCategoryToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "ProductType" && < AdminProductTypeCreateEdit isOpen={true} productTypeToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "ProductLabel" && < AdminProductLabelCreateEdit isOpen={true} productLabelToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "Location" && < AdminPlaceCreateEdit isOpen={true} locationToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "Shop" && < FishShopCreateEdit isOpen={true} fishShopToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "SalesArea" && < OperatingAreaCreateEdit isOpen={true} operatingAreaToEdit={selectedEntity} onClose={handleClose} />}
                {selectedKind === "User" && < RegisterUser isOpen={true} userToEdit={selectedEntity} onClose={handleClose} />}
                {selectedMenu.kind === "Order" && < AdminOrders />}

            </div>
        </>
    );


};


export default TopMenuAdmin;
