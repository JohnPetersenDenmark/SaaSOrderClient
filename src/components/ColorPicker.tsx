import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    onhandleSelected: (selectedColor: string) => void;
    defaultColor : string
    //onClose: (selectedColor: string) => void;
}


 const ColorPicker: React.FC<ColorPickerProps> = ({ onhandleSelected , defaultColor}) => {


    const [color, setColor] = useState<string>(defaultColor);

   /*  function handleClose() {
        onhandleSelected(color)
    } */

    function handleSelectedColor(selectedColor : string) {
        onhandleSelected(selectedColor)
    }

    return (
        <>
            {/* <div  className="bg-thirdBackgroundColor h-48 border w-10 border-gray-600 mb-10"  > */}
                <HexColorPicker color={color} onChange={handleSelectedColor}  />
                {/* <p>Selected color: {color}</p> */}
            {/* </div> */}

           {/*  <button
                onClick={handleClose}
                className="px-4 py-2 bg-blue rounded hover:bg-gray-300"
            >
                Close
            </button> */}
        </>
    );

}

export default ColorPicker