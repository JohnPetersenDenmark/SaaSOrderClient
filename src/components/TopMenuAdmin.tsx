import React, {  useState } from 'react';
import { useDashboardContext } from './admin/DashboardContext';
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
    clickableText: string;
    component: React.ComponentType; // points to actual component
}

const TopMenuAdmin: React.FC = () => {

    //const { user, authStatus } = useCurrentUser();
    const [selectedMenuPoint, setSelectedMenuPoint] = useState(0);
  //  const navigate = useNavigate();

    const { isOpen, setIsOpen } = useDashboardContext();

    const handleClose = () => {
        setIsOpen(false);
    };
 
    function handleMenuSelection(menuItem: number) {
        setSelectedMenuPoint(menuItem);
        /*  if (menuItem === 5) {
             navigate("/admin")
         } */
    }

  

    const menuArray: MenuPoint[] = [];

     let newMenuPoint = {
        clickableText: "Stadepladser",
        component: AdminPlaces
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        clickableText: "Produkter",
        component: AdminProducts
    }
    menuArray.push(newMenuPoint)

      newMenuPoint = {
        clickableText: "Ordrer",
        component: AdminOrders
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        clickableText: "Biler",
        component: AdminFishshop
    }
    menuArray.push(newMenuPoint)


newMenuPoint = {
        clickableText: "Produktmærkninger",
        component: AdminProductLabels
    }
    menuArray.push(newMenuPoint)

     newMenuPoint = {
        clickableText: "Produktkategorier",
        component: AdminProductCategories
    }
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        clickableText: "Produkttyper",
        component: AdminProductTypes
    }
    menuArray.push(newMenuPoint)

      newMenuPoint = {
        clickableText: "Medarbejdere",
        component: AdminEmployee
    }
    menuArray.push(newMenuPoint)

       newMenuPoint = {
        clickableText: "Brugere",
        component: AdminUsers

    }    
    menuArray.push(newMenuPoint)

    newMenuPoint = {
        clickableText: "Områder",
        component: AdminOperatingArea
    }
    menuArray.push(newMenuPoint)


    return (
        <>
            <div className="flex flex-col gap-60  bg-white">
                <div className="flex">
                    {/* Column 1 */}
                    <div className="flex-1  text-black p-4 text-center">
                        <img src="/images/jjfisk_logo.svg" alt="Logo" height={100} width={100} />
                    </div>

                    {/* Column 2 with nested row */}
                    <div className="flex-5 text-black p-4">
                        <div className="grid grid-cols-10 gap-2 text-center">
                            {menuArray.map((menuPoint, index) => (
                                <>
                                    <div
                                        className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == index ? 'text-hoverMenuActionsColor' : 'text-black'}`}
                                        onClick={() => handleMenuSelection(index)}
                                    >
                                        {menuPoint.clickableText}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex-1 text-white p-4 text-center">

                    </div>
                </div>

            </div>

            {menuArray[selectedMenuPoint]?.component
                ? React.createElement(menuArray[selectedMenuPoint].component)
                : ''}



        </>

    )
}

export default TopMenuAdmin;
