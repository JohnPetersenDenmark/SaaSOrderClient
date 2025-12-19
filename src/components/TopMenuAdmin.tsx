import React, { useState } from 'react';
import { useDashboardContext } from './admin/DashboardContext';
import { useNavigate } from "react-router-dom";
import { CurrentUser, useCurrentUser } from './CurrentUser';


import AdminPlaces from '../pages/Administration/AdminPlaces';
import AdminProducts from './admin/AdminProducts';
import AdminFishshop from '../pages/Administration/AdminFishshop';
import AdminProductCategories from '../pages/Administration/AdminProductCategories';
import AdminProductTypes from '../pages/Administration/AdminProductTypes';
import AdminEmployee from '../pages/Administration/AdminEmployee';
import AdminOrders from '../pages/Administration/AdminOrders';
import AdminProductLabels from '../pages/Administration/AdminProductLabels';
import AdminUsers from '../pages/Administration/AdminUsers';
import AdminOperatingArea from '../pages/Administration/AdminOperatingArea';


interface MenuPoint {
    menuId: string
    clickableText: string;
    component: React.ComponentType; // points to actual component
}

const TopMenuAdmin: React.FC = () => {

    const [selectedMenuPoint, setSelectedMenuPoint] = useState<MenuPoint>();
   
    function handleMenuSelection(menuPoint: MenuPoint) {        
        setSelectedMenuPoint(menuPoint);              
    }


    const menuArray: MenuPoint[] = [];

    let newMenuPoint = {
        menuId: 'm1',
        clickableText: "Stadepladser",
        component: AdminPlaces
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm2',
        clickableText: "Produkter",
        component: AdminProducts
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm3',
        clickableText: "Ordrer",
        component: AdminOrders
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm4',
        clickableText: "Biler",
        component: AdminFishshop
    }
    menuArray.push(newMenuPoint)


    newMenuPoint = {
        menuId: 'm5',
        clickableText: "Produktmærkninger",
        component: AdminProductLabels
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm6',
        clickableText: "Produktkategorier",
        component: AdminProductCategories
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm7',
        clickableText: "Produkttyper",
        component: AdminProductTypes
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm8',
        clickableText: "Medarbejdere",
        component: AdminEmployee
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm9',
        clickableText: "Brugere",
        component: AdminUsers

    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        menuId: 'm10',
        clickableText: "Områder",
        component: AdminOperatingArea
    }
    menuArray.push(newMenuPoint)


    return (
        <>
            <div className="flex flex-col gap-60  bg-primaryBackgroundColor">
                <div className="flex">
                    {/* Column 1 */}
                    <div className="flex-1  text-primaryTextColor p-4 text-center ">
                        <img src="/images/jjfisk_logo.svg" alt="Logo" height={100} width={100}
                        //  onClick={() => handleMenuSelection(0)}
                        />
                    </div>

                    {/* Column 2 with nested row */}
                    <div className="flex-5 text-primaryTextColor p-4">
                        <div className="grid grid-cols-10 gap-2 text-center ">
                            {menuArray.map((menuPoint) => (

                                <div key={menuPoint.menuId}
                                     className={`  cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint?.component == menuPoint.component ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`}
                                    onClick={() => handleMenuSelection(menuPoint)}
                                >
                                    {menuPoint.clickableText}
                                </div>

                            ))}
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex-1 text-white p-4 text-center">

                    </div>
                </div>

            </div>

            {selectedMenuPoint && React.createElement(selectedMenuPoint.component)}
          
        </>

    )
}

export default TopMenuAdmin;
