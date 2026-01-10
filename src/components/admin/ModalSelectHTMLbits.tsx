import { useState, useEffect } from "react";
import { get } from "../../core/api/axiosHttpClient";
import RichTextViewer from "../RichTextViewer";


export interface htmlBit {
  name: string,
  html: string
  id: string
}

type ModalProps = {
  open: boolean;
  onhandleSelected: (selectedHTMLbit: htmlBit) => void;
  onClose: () => void;
  title?: string;
};

export function ModalSelectHTMLbits({ open, onClose, title, onhandleSelected }: ModalProps) {

  const [htmlSnippets, setsetHtmlSnippets] = useState<any[]>([])

  const [svgSelected, setSvgSelected] = useState<htmlBit | null>(null);
  const [svgSelectedWidth, setSvgSelectedWidth] = useState("0")
  const [svgSelectedHeight, setSvgSelectedHeight] = useState("0")


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await get('/Home/htmlsnippetlist');
        setsetHtmlSnippets(response);
      } catch {
        //setError('Failed to load pizzas');
      }
    };

    fetchProducts();
  }, []);


  function handleClose() 
  {
    if (svgSelected) {
      let tmpString = svgSelected?.html

      const parser = new DOMParser();
      if (tmpString) {
        const doc = parser.parseFromString(tmpString, "image/svg+xml");


        const svg = doc.documentElement;

        // read

        //  const height = svg.getAttribute("height");

        // change

        svg.setAttribute("height", svgSelectedHeight);
        svg.setAttribute("width", svgSelectedWidth);

        // back to string
        const updatedSvgString = svg.outerHTML;

        let NewHtmlSnippet: htmlBit =
        {
          name: svgSelected ? svgSelected.name : '',
          id: svgSelected ? svgSelected.id : '',
          html: updatedSvgString
        }


        onhandleSelected(NewHtmlSnippet)
      }
      //onClose()
    }
  }

    function handleSelectedHtmlSnippet(selectedHTMLbit: htmlBit) {
      let y = selectedHTMLbit.html
      if (selectedHTMLbit.html.indexOf('<svg') > -1) {
        setSvgSelected(selectedHTMLbit)
      }
    }

    function handleWidthSizeChanged(svgWidthSize: string) {
      setSvgSelectedWidth(svgWidthSize)
    }

  

  function handleHeightSizeChanged(svgHeightSize: string) {
    setSvgSelectedHeight(svgHeightSize)
  }





  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {title && (
          <div className="px-4 py-3 border-b font-semibold">
            {title}
          </div>
        )}

        <div className="px-4 py-3 border-t text-right bg-primaryBackgroundColor">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>


        <div className="p-4 bg-primaryBackgroundColor text-secondaryTextColor max-h-[60vh] overflow-y-auto">
          {htmlSnippets.map((b: any) => (
            <div key={b.id}>
              <div
                className="bg-thirdBackgroundColor h-48 border border-gray-600"
                onClick={() => handleSelectedHtmlSnippet(b)}
              >
                {b.name} <RichTextViewer html={b.html} />

                <label htmlFor="svgwidthsize">Width:</label>
                <input
                  id="svgwidthsize"
                  type="text"
                  value={svgSelectedWidth}
                  onChange={(e) => handleWidthSizeChanged(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderRadius: "4px",
                  }}
                />

                <label htmlFor="svgheightsize">Height:</label>
                <input
                  id="svgwidthsize"
                  type="text"
                  value={svgSelectedHeight}
                  onChange={(e) => handleHeightSizeChanged(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.25rem",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
