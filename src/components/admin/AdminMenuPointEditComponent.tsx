import type { MenuPoint } from "./AdminConfig";
import EmployeeCreateEdit from "./EmployeeCreateEdit";
import AdminProductCreateEdit from "./AdminProductCreateEdit";

import AdminProductCategoryCreateEdit from './AdminProductCategoryCreateEdit';
import AdminProductTypeCreateEdit from './AdminProductTypeCreateEdit';
import AdminProductLabelCreateEdit from './AdminProductLabelCreateEdit';
import AdminPlaceCreateEdit from './AdminPlaceCreateEdit';
import FishShopCreateEdit from './FishShopCreateEdit';
import OperatingAreaCreateEdit from './OperatingAreaCreateEdit';
import RegisterUser from './RegisterUser';


export type EditorProps = {
    isOpen: boolean;
    entityToEdit: any | null;
    selectedMenuPoint: MenuPoint
    onClose: () => void;
};


 const isOpen = true;

 


const AdminMenuPointEditComponent: React.FC<EditorProps> = ({ isOpen, onClose, entityToEdit, selectedMenuPoint }) => {



    if (!isOpen)
        return (<></>);



    let component = null;
    switch (selectedMenuPoint.kind) {
        case "Employee":
            component = < EmployeeCreateEdit isOpen={true} employeeToEdit={entityToEdit} onClose={onClose} />
            break;

        case "Product":
            component = < AdminProductCreateEdit isOpen={true} productToEdit={entityToEdit} onClose={onClose} />
            break;

        case "ProductCategory":
            component = < AdminProductCategoryCreateEdit isOpen={true} productCategoryToEdit={entityToEdit} onClose={onClose} />
            break;

        case "ProductType":
            component = < AdminProductTypeCreateEdit isOpen={true} productTypeToEdit={entityToEdit} onClose={onClose} />
            break;

        case "ProductLabel":
            component = < AdminProductLabelCreateEdit isOpen={true} productLabelToEdit={entityToEdit} onClose={onClose} />
            break;

        case "Shop":
            component = < FishShopCreateEdit isOpen={true} fishShopToEdit={entityToEdit} onClose={onClose} />
            break;

        case "Location":
            component = < AdminPlaceCreateEdit isOpen={true} locationToEdit={entityToEdit} onClose={onClose} />
            break;

        case "SalesArea":
            component = < OperatingAreaCreateEdit isOpen={true} operatingAreaToEdit={entityToEdit} onClose={onClose} />
            break;

        case "User":
            component = < RegisterUser isOpen={true} userToEdit={entityToEdit} onClose={onClose} />
            break;

        default:
            break;
    }

    return (<>
        {component}
    </>);

}

export default AdminMenuPointEditComponent