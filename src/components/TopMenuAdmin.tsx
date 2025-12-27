import React, { useState, useEffect } from 'react';
import { AdminEntityView } from './admin/AdminEntityView';
import {menuArray } from './admin/AdminConfig';
import type { MenuPoint } from './admin/AdminConfig';
import AdminMenuPointEditComponent from './admin/AdminMenuPointEditComponent';
import { get, remove } from "../core/api/axiosHttpClient";
import AdminOrders from '../pages/Administration/AdminOrders';
import { CurrentUser, useCurrentUser } from './CurrentUser';

const TopMenuAdmin: React.FC = () => {
    const [error, setError] = useState("");

    const { user, authStatus, logout } = useCurrentUser();
   const curUser = user;

   useEffect(() => {
    const load = async () => {
        const response : any = await get(menuArray[0].getDataURL);

        const updatedMenu : MenuPoint = {
            ...menuArray[0],
            data: response
        };

        setSelectedEntity(null);
        setSelectedMenu(updatedMenu);
    };

    load();
}, []);

    const [selectedMenu, setSelectedMenu] = useState<MenuPoint>(menuArray[0]);
    const [selectedKind, setSelectedKind] = useState("");
    const [selectedEntity, setSelectedEntity] = useState<any | null>(null);
    const [update, setUpdate] = useState(0);
    const [edit, setEdit] = useState(false);


    const fetchEntities = async (url: string) => {
        try {
            const response: any = await get(url);
            return response;
        } catch (err) {
            setError('Failed to load entitiess');
        }
    };


    async function handleSelectedMenu(menuPoint: MenuPoint) {
        const response = await fetchEntities(menuPoint.getDataURL);
        menuPoint.data = response;
        setSelectedMenu(menuPoint);

    }

    async function handleClose() {
        const response = await fetchEntities(selectedMenu.getDataURL);
        selectedMenu.data = response;
        setEdit(false)
        setSelectedKind("");
    };

    function handleEdit(item: any | null) {

        setSelectedKind(selectedMenu.kind)
        setEdit(true);
        setSelectedEntity(item)
    }


    async function handleDelete(item: any) {
        await removeItem(item);
        const response = await fetchEntities(selectedMenu.getDataURL);
        selectedMenu.data = response;
        let updateCount = update + 1;
        setUpdate(updateCount);
    }

    const removeItem = async (item: any) => {
        try {
            const removeUrl =
                await remove(selectedMenu.removeURL + item.id)
        } catch (error) {
            setError('Fejl');
            console.error(error);
        } finally {

        }
    }

    return (
        <>
            <div className="flex flex-col bg-primaryBackgroundColor">
                <div className="flex items-center">
                    <div className="flex-1 p-4">
                        <img src="/images/jjfisk_logo.svg" alt="Logo" width={100} />
                    </div>
                     <div className="flex-1 p-4 text-primaryTextColor">
                        {curUser?.displayname}
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

                    {selectedMenu.kind == "Order" &&  <AdminOrders  />}
            </div>

            <div>                
                  { edit && < AdminMenuPointEditComponent isOpen={true} entityToEdit={selectedEntity} onClose={handleClose} selectedMenuPoint={selectedMenu} /> }
            </div>
        </>
    );


};

export default TopMenuAdmin;
