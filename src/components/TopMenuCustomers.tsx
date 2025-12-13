import { useConfig } from "../config";
import {  useState } from 'react';
import { useNavigate } from "react-router-dom";


const TopMenuCustomers = () => {
    const { config } = useConfig();
    const [selectedMenuPoint, setSelectedMenuPoint] = useState(0);
    const navigate = useNavigate();

    function handleMenuSelection(menuItem: number) {
        setSelectedMenuPoint(menuItem);
        if (menuItem === 5) {
            navigate("/admin")
        }
    }

    return (
        <>
            <div className="flex flex-col gap-60  bg-primaryBackgroundColor">
                <div className="flex">
                    {/* Column 1 */}
                    <div className="flex-1  text-primaryTextColor p-4 text-center">

                        <img src={config.branding.logo} alt="Logo" height={100} width={100} />
                    </div>

                    {/* Column 2 with nested row */}
                    <div className="flex-1 text-primaryTextColor p-4">
                        <div className="grid grid-cols-5 gap-2 text-center">
                            <div className="text-2xl p-2">
                                <span
                                    onClick={() => handleMenuSelection(1)}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == 1 ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`} >
                                    FORSIDE
                                </span>
                            </div>
                            <div className="text-2xl p-2">
                                <span
                                    onClick={() => handleMenuSelection(2)}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == 2 ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`} >
                                    NYHEDER
                                </span>
                            </div>
                            <div className="text-2xl p-2">
                                <span
                                    onClick={() => handleMenuSelection(3)}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == 3 ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`} >
                                    OM OS
                                </span>
                            </div>
                            <div className="text-2xl p-2">
                                <span
                                    onClick={() => handleMenuSelection(4)}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == 4 ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`} >
                                    KONTAKT
                                </span>
                            </div>
                            <div className="text-2xl p-2">
                                <span
                                    onClick={() => handleMenuSelection(5)}
                                    className={`cursor-pointer hover:text-hoverMenuActionsColor ${selectedMenuPoint == 4 ? 'text-hoverMenuActionsColor' : 'text-primaryTextColor'}`} >
                                    ADMINISTRATION
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex-1 text-primaryTextColor p-4 text-center">
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopMenuCustomers;