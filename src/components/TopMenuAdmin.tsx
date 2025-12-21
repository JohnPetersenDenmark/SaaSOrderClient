import React, { useState, useEffect } from 'react';
import { AdminEntityView } from './admin/AdminEntityView';
import { productColumns, employeeColumns } from './admin/AdminConfig';
import { get } from "../core/api/axiosHttpClient";
import type { Employee } from '../core/types/Employee';
import type { Product } from '../core/types/Product';

//import AdminEmployee from '../pages/Administration/AdminEmployee';
//import EmployeeCreateEdit from './admin/EmployeeCreateEdit';


interface MenuPoint {
    menuId: string;
    clickableText: string;
    title: string;
    columns: any[]; // The TanStack ColumnDef 
    data: any[];    // Your state or fetched data
    //   editComponent: React.ComponentType;
}

const TopMenuAdmin: React.FC = () => {
    // 1. In a real app, you would fetch these from your context/API
    const [products, setProducts] = useState([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: any = await get('/Home/productlist');
                setProducts(response)
            } catch {
                setError('Failed to load products');
            }
        };
        fetchProducts();

        const fetchEmployees = async () => {
            try {
                const response  = await get<Employee[]>('/Admin/employeelist');
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
            //   editComponent : AdminEmployee
        },
        {
            menuId: 'm2',
            clickableText: "Medarbejdere",
            title: "Administrer Medarbejdere",
            columns: employeeColumns,
            data: employees,
            //    editComponent : EmployeeCreateEdit()
        }
    ];

    const [selectedMenu, setSelectedMenu] = useState<MenuPoint>(menuArray[0]);

    // 3. Handlers for the buttons inside AdminEntityView
    //  const handleEdit = (item: any) => console.log("Editing:", item);

    function handleEdit(item: any ) {
       
        if ( item.interfaceType === "Employee")
        {
            var x = 1;
        }
        
        

    }



    function handleDelete(item: any) {
        console.log("Deleting:", item);
    }



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
                                    onClick={() => setSelectedMenu(menuPoint)}
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
                <AdminEntityView
                    title={selectedMenu.title}
                    data={selectedMenu.data}
                    columns={selectedMenu.columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );


};


export default TopMenuAdmin;
