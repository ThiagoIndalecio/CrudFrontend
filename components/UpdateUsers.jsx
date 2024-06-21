import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Modal from './ModalUpdateUser';
import DeleteModal from './DeleteModal';

export default function AlterarUser() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSearch = async (values) => {
        try {
            console.log(values.userEmail);
            const response = await axios.post('http://localhost:3000/api/user/buscar', 
                { email: values.userEmail });

            if (response.data.user) {
                console.log(response);
                setUserData(response.data.user);
                setSearchError("");
            } else {
                setUserData(null);
                setSearchError("Usuario não encontrado.");
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            setUserData(null);
            setSearchError("Erro ao buscar usuário. Por favor, tente novamente.");
        }
    };

    const handleModalShow = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
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
                data: { id: userData.id }
            });
            setUserData(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
                <Formik initialValues={{ userEmail: "" }} onSubmit={handleSearch}>
                    <Form className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg shadow-black/20">
                        <h1 className="text-3xl font-bold mb-1">Procurar Usuário</h1>
                        <p className="mb-4 text-gray-500">Busque pelo Email</p>

                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="cliName">Cliente</label>
                                    <Field
                                        name="userEmail"
                                        type="text"
                                        placeholder="E-mail"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm" />
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
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Admin</th>
                                            <th className="px-6 py-3">Alterar</th>
                                            <th className="px-6 py-3">Inativar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData && (
                                            <tr className="odd:bg-slate-200 even:bg-gray-50 border-b">
                                                <td className="px-6 py-4">{userData.name}</td>
                                                <td className="px-6 py-4">{userData.email}</td>
                                                <td className="px-6 py-4">{userData.status ? 'Ativo' : 'Inativo'}</td>
                                                <td className="px-6 py-4">{userData.is_admin ? 'Sim' : 'Não'}</td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => handleModalShow(userData)} 
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
                        userName: selectedUser?.name || "",
                        userEmail: selectedUser?.email || "",
                        userSenha: selectedUser?.password || "",
                        userIsAdmin: selectedUser?.is_admin || "",
                        userStatus: selectedUser?.status || "",
                    }}
                    closeModal={handleModalClose}
                    userData={selectedUser}
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
