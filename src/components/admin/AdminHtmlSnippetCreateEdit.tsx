import React, { useEffect, useState } from 'react';
import {  post} from "../../core/api/axiosHttpClient";

interface ProductLabelModalProps {
    isOpen: boolean;
    htmlSnippetToEdit: any | null;
    onClose: () => void;
}

const AdminHtmlSnippetCreateEdit: React.FC<ProductLabelModalProps> = ({ isOpen, onClose, htmlSnippetToEdit }) => {

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [htmlSnippetName, setHtmlSnippetName] = useState<string>('');
    const [htmlSnippetNameTouched, setHtmlSnippetNameTouched] = useState(false);

   
    const [snippetHtml, setSnippetHtml] = useState<string>('');

    const isHtmlSnippetNameValid = htmlSnippetName.length > 0;
    const isFormValid = isHtmlSnippetNameValid


    useEffect(() => {
        if (!isOpen) return;

        if (htmlSnippetToEdit !== null) {
            setHtmlSnippetName(htmlSnippetToEdit.name);
            setSnippetHtml(htmlSnippetToEdit.html)

        }
        else {
            setHtmlSnippetName('');
            setSnippetHtml('');
        }

        setHtmlSnippetNameTouched(false);


        setSubmitting(false);

    }, [isOpen]);



    const handleSubmit = async () => {

        const htmlSnippetData = {
            id: htmlSnippetToEdit !== null ? htmlSnippetToEdit.id : 0,
            name: htmlSnippetName.trim(),
            html: snippetHtml
        }
       
        try {
            const response = await post('/Admin/addorupdatehtmlsnippet', htmlSnippetData);
            onClose();
        } catch (error) {
            setSubmitError('Fejl');
            console.error(error);
        } finally {
            setSubmitting(false);
        }

    };


    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // optional backdrop
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '1rem', // allow some breathing space on small screens
            }}
        >
            <div
                style={{
                    backgroundColor: '#5470a9',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '500px', // stays smaller on desktop
                }}
            >
                <h2
                    style={{
                        backgroundColor: '#5470a9',
                        padding: '1rem',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '1.25rem',
                        textAlign: 'center',
                        margin: 0,
                        marginBottom: '1rem',
                    }}
                >
                    HTML snippet
                </h2>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        id="htmlsnippetlabel"
                        type="text"
                        value={htmlSnippetName}
                        onChange={(e) => setHtmlSnippetName(e.target.value)}
                        onBlur={() => setHtmlSnippetNameTouched(true)}
                        placeholder="HTML snippet navn"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderColor:
                                !isHtmlSnippetNameValid && htmlSnippetNameTouched ? 'red' : undefined,
                            borderWidth: '1.5px',
                            borderStyle: 'solid',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                        }}
                        disabled={submitting}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        id="htmlsnippetlabel"
                        type="text"
                        value={snippetHtml}
                        onChange={(e) => setSnippetHtml(e.target.value)}                      
                        placeholder="HTML snippe"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderColor:
                                !isHtmlSnippetNameValid ? 'red' : undefined,
                            borderWidth: '1.5px',
                            borderStyle: 'solid',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                        }}
                        disabled={submitting}
                    />
                </div>

                

<div className="flex gap-4 mb-0">
                    <div className="flex-1">
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid || submitting}
                            className="w-full px-4 py-2 rounded bg-white text-black hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Ok
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            onClick={onClose}
                            disabled={submitting}
                            className="w-full px-4 py-2 rounded bg-white text-black hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AdminHtmlSnippetCreateEdit;