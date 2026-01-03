import { useState, useEffect } from "react";
import { get } from "../../core/api/axiosHttpClient";
import RichTextViewer from "../RichTextViewer";

export interface htmlBit {
  name: string,
  html: string
  id : string
}

type ModalProps = {
  open: boolean;
  onhandleSelected: (selectedHTMLbit: htmlBit) => void;
  onClose: () => void;
  title?: string;
};

export function ModalSelectHTMLbits({ open, onClose, title, onhandleSelected }: ModalProps) {

  const [selectedHTMLbit, setSelectedHTMLbit] = useState<htmlBit>()
  const [htmlSnippets, setsetHtmlSnippets] = useState<any[]>([])

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

 

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {title && (
          <div className="px-4 py-3 border-b font-semibold">
            {title}
          </div>
        )}

        <div className="p-4 overflow-auto bg-primaryBackgroundColor text-secondaryTextColor">
          {htmlSnippets.map((b: any) => (
            <div>
              <div className="bg-thirdBackgroundColor h-20 border border-gray-600"
                onClick={() => onhandleSelected(b)}
              >
                {b.name}    <RichTextViewer html={b.html} />
              </div>            
            </div>
          ))}


        </div>

        <div className="px-4 py-3 border-t text-right bg-primaryBackgroundColor">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
