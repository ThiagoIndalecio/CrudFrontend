import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Modal from './ModalUpdateUser';
import DeleteModal from './DeleteModal';

export default function AlterarClient() {
    const [clientData, setClientData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSearch = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/api/client/buscar',
                { cliInfo: values.cliName });
            if (response.data.client) {
                setClientData(response.data.client);
                setSearchError("");
            } else {
                setClientData(null);
                setSearchError("Cliente não encontrado.");
            }
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            setClientData(null);
            setSearchError("Erro ao buscar cliente. Por favor, tente novamente.");
        }
    };

    const handleModalShow = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedClient(null);
    };

    const handleDeleteModel = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.post("http://localhost:3000/api/client/delete", {
                data: { id: clientData.id }
            });
            setClientData(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
                <Formik initialValues={{ cliName: "" }} onSubmit={handleSearch}>
                    <Form className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg shadow-black/20">
                        <h1 className="text-3xl font-bold mb-1">Procurar Cliente</h1>
                        <p className="mb-4 text-gray-500">Busque pelo CPF ou Email</p>

                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="cliName">Cliente</label>
                                    <Field
                                        name="cliName"
                                        type="text"
                                        placeholder="CPF ou E-mail"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="cliName" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            {searchError && (
                                <div className="text-red-500 text-sm">{searchError}</div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                                    <thead className="text-xs text-white uppercase bg-indigo-600">
                                        <tr>
                                            <th className="px-6 py-3">Nome</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Telefone</th>
                                            <th className="px-6 py-3">CPF</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Alterar</th>
                                            <th className="px-6 py-3">Inativar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientData && (
                                            <tr className="odd:bg-slate-200 even:bg-gray-50 border-b">
                                                <td className="px-6 py-4">{clientData.cli_name}</td>
                                                <td className="px-6 py-4">{clientData.cli_email}</td>
                                                <td className="px-6 py-4">{clientData.cli_phone}</td>
                                                <td className="px-6 py-4">{clientData.cli_cpf}</td>
                                                <td className="px-6 py-4">{clientData.cli_status ? 'Ativo' : 'Inativo'}</td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => handleModalShow(clientData)} 
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        Alterar
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={handleDeleteModel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                        Inativar
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Buscar Cliente
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            {showModal && (
                <Modal
                    initialValues={{
                        cliName: selectedClient?.cli_name || "",
                        cliEmail: selectedClient?.cli_email || "",
                        cliPhone: selectedClient?.cli_phone || "",
                        cliCpf: selectedClient?.cli_cpf || "",
                        cliStatus: selectedClient?.cli_status || "",
                    }}
                    closeModal={handleModalClose}
                    clientData={selectedClient}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    closeModal={handleDeleteCloseModal}
                    confirmDelete={handleDeleteConfirm}
                />
            )}
        </div>
    );
}
