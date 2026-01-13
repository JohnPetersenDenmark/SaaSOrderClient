import { useState, useEffect } from "react";
import { get } from "../../core/api/axiosHttpClient";
import RichTextViewer from "../RichTextViewer";
import ColorPicker from "../ColorPicker";


export interface htmlBit {
  name: string,
  html: string
  id: string
}

type ModalProps = {
  open: boolean;
  onhandleSelected: (selectedHTMLbit: htmlBit | null) => void;
  onClose: () => void;
  title?: string;
};

export function ModalSelectHTMLbits({ open, onClose, title, onhandleSelected }: ModalProps) {

  const [htmlSnippets, setsetHtmlSnippets] = useState<any[]>([])

  const [htmlSnippetSelected, setHtmlSnippetSelected] = useState<htmlBit | null>(null);

  const [svgSelected, setSvgSelected] = useState<htmlBit | null>(null);
  const [svgSelectedWidth, setSvgSelectedWidth] = useState("0")
  const [svgSelectedHeight, setSvgSelectedHeight] = useState("0")

  const [color, setColor] = useState<string>("");


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


  function handleClose() {
    if (svgSelected) {
   /*    let tmpString = svgSelected?.html

      const parser = new DOMParser();
      if (tmpString) {
        const doc = parser.parseFromString(tmpString, "image/svg+xml");
        const svg = doc.documentElement;

        svg.setAttribute("height", svgSelectedHeight);
        svg.setAttribute("width", svgSelectedWidth);

        let PathNode = svg.querySelector('path')
        if (PathNode) {
          let currentColor = PathNode.getAttribute('fill')
          PathNode.setAttribute('fill', color)
        }

        const updatedSvgString = svg.outerHTML;

        let NewHtmlSnippet: htmlBit =
        {
          name: svgSelected ? svgSelected.name : '',
          id: svgSelected ? svgSelected.id : '',
          html: updatedSvgString
        }


        onhandleSelected(NewHtmlSnippet)
        return;
      } */

        onhandleSelected(svgSelected)
        return;
    }

    onhandleSelected(htmlSnippetSelected)
  }



  function handleSelectedHtmlSnippet(selectedHTMLbit: htmlBit) {

    setHtmlSnippetSelected(selectedHTMLbit)

    let y = selectedHTMLbit.html

    if (selectedHTMLbit.html.indexOf('<svg') > -1) {
      setSvgSelected(selectedHTMLbit)

      let tmpString = selectedHTMLbit?.html
      const parser = new DOMParser();
      const doc = parser.parseFromString(tmpString, "image/svg+xml");
      const svg = doc.documentElement;

      let height = svg.getAttribute("height");
      height ? setSvgSelectedHeight(height) : setSvgSelectedHeight("0")

      let width = svg.getAttribute("width");
      width ? setSvgSelectedWidth(width) : setSvgSelectedWidth("0")

      if (!height || !width) {
        let viewBox = svg.getAttribute("viewBox");
        if (viewBox) {
          let viewBoxOptions = viewBox.split(' ')
          height = viewBoxOptions[3]
          height ? setSvgSelectedHeight(height) : setSvgSelectedHeight("0")

          width = viewBoxOptions[2]
          width ? setSvgSelectedWidth(width) : setSvgSelectedWidth("0")
        }
      }

      let PathNode = svg.querySelector('path')
      if (PathNode) {
        let currentColor = PathNode.getAttribute('fill')
        if (currentColor) {
          setColor(currentColor)
        }
      }
    }
    else {
      setSvgSelected(null)
    }
  }

  function setAttributesOnSelectedSvg(svgHeight : string, svgWidth : string, svgColor : string) {
    let svgHtml = svgSelected?.html

    if (svgHtml) {
      const parser = new DOMParser();

      const doc = parser.parseFromString(svgHtml, "image/svg+xml");
      const svg = doc.documentElement;
       svg.setAttribute("height", svgHeight);
        svg.setAttribute("width", svgWidth);

        let PathNode = svg.querySelector('path')
        if (PathNode) {
          PathNode.setAttribute('fill', svgColor)
        }

        let NewHtmlSnippet: htmlBit =
        {
          name: svgSelected ? svgSelected.name : '',
          id: svgSelected ? svgSelected.id : '',
          html: svg.outerHTML
        }

        setSvgSelected(NewHtmlSnippet)
    }


  }

    function handleWidthSizeChanged(svgWidthSize: string) {
    setSvgSelectedWidth(svgWidthSize)

    setAttributesOnSelectedSvg(svgSelectedHeight, svgWidthSize, color)
  }

  function handleHeightSizeChanged(svgHeightSize: string) {
    setSvgSelectedHeight(svgHeightSize)
    setAttributesOnSelectedSvg(svgHeightSize, svgSelectedWidth, color)
  }

  function onhandleSelectedColor(hexColorValue: string) {
    if (!svgSelected) {
      return;
    }
    setColor(hexColorValue)
    setAttributesOnSelectedSvg(svgSelectedHeight, svgSelectedWidth, hexColorValue)
  }




  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full  max-h-[80vh]">
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
            // <div key={b.id}>
            <>
              <div
                className="ml-5 bg-thirdBackgroundColor  h-48 border border-gray-600 overflow-y-auto"
                onClick={() => handleSelectedHtmlSnippet(b)}
              >
                <div className="ml-5" >
                  {b.name}
                </div>

                {
                  svgSelected && htmlSnippetSelected && b.id === htmlSnippetSelected.id
                    ?
                    <RichTextViewer html={svgSelected.html} />
                    :
                    <RichTextViewer html={b.html} />
                }

              </div>

              {svgSelected && htmlSnippetSelected && b.id === htmlSnippetSelected.id &&

                <div
                  className="ml-5 bg-thirdBackgroundColor h-48 border border-gray-600"
                // onClick={() => handleSelectedHtmlSnippet(b)}
                >

                  <div className="ml-5 mr-5">

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
                  </div>

                  <div className="ml-5 mr-5">
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

                  <div className="ml-0  bg-thirdBackgroundColor">
                    <div className="mt-5 ml-52 bg-thirdBackgroundColor">
                      <ColorPicker defaultColor={color} onhandleSelected={onhandleSelectedColor} />
                    </div>
                  </div>

                </div>
              }
            </>
          ))}
        </div>

      </div>
    </div>
  );
}
