import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    onhandleSelected: (selectedColor: string) => void;
    //onClose: (selectedColor: string) => void;
}


 const ColorPicker: React.FC<ColorPickerProps> = ({ onhandleSelected }) => {


    const [color, setColor] = useState<string>("#aabbcc");

    function handleClose() {
        onhandleSelected(color)
    }

    return (
        <>
            <div style={{ padding: "1rem" }}>
                <HexColorPicker color={color} onChange={setColor} />
                <p>Selected color: {color}</p>
            </div>

            <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                Close
            </button>
        </>
    );

}

export default ColorPicker