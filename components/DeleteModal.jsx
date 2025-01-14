import React from 'react';

export default function DeleteModal({ closeModal, confirmDelete }) {
    const handleDelete = () => {
        closeModal();
       
    };

    const handleDeleteConfirm = () =>{
        confirmDelete();
    }
    
    return (
        <div id="delete-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-80">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button" className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Tem certeza que deseja inativar este cadastro?</h3>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleDeleteConfirm} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Sim, tenho certeza
                            </button>
                            <button onClick={handleDelete} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
                                Não, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
