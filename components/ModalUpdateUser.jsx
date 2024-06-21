import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from 'axios';

const Modal = ({ closeModal, initialValues, userData }) => {
    const [modalShow, setModalShow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const validationSchema = yup.object({
        userName: yup.string().required("Nome é obrigatório"),
        userEmail: yup.string().email("Insira um e-mail válido").required("E-mail é obrigatório"),
        userSenha: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
        userIsAdmin: yup.boolean().oneOf([true]),
        userStatus: yup.boolean().oneOf([true]),
    });

    const handleUserUpdate = async (values) => {
        try {
            const result = await axios.post("http://localhost:3000/api/user/update", {
                id: userData.id,
                name: values.userName,
                email: values.userEmail,
                password: values.userSenha,
                admin: values.userIsAdmin,
                status: values.userStatus
            });
            if (result.data.update) {
                setModalShow(true);
                setModalMessage(result.data.message);
            } else {
                setIsError(true);
                setModalMessage(result.data.message || 'Erro ao atualizar usuário.');
            }
        } catch (error) {
            setIsError(true);
            setModalMessage('Erro ao atualizar usuário.');
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
            <div className="relative bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-xl">
                <button
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={closeModal}
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex items-center justify-center">
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleUserUpdate}
                        >
                            <Form className="p-2 w-full">
                                <h1 className="text-3xl font-bold mb-1">Atualizar Cliente</h1>
                                <p className="mb-4 text-gray-500">Insira as informações para atualizar o cadastro!</p>

                                <div className="space-y-4">
                                    <div className="flex space-x-4">
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-gray-700" htmlFor="userName">Nome</label>
                                            <Field
                                                name="userName"
                                                type="text"
                                                placeholder="Nome do cliente"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email</label>
                                        <Field
                                            disabled
                                            name="userEmail"
                                            type="email"
                                            placeholder="E-mail do cliente"
                                            className="cursor-not-allowed mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="userSenha">Senha</label>
                                        <Field
                                            name="userSenha"
                                            type="password"
                                            placeholder="Senha do cliente"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <ErrorMessage name="userSenha" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className=" block text-sm font-medium text-gray-700" htmlFor="userIsAdmin">Admin</label>
                                        <Field
                                            name="userIsAdmin"
                                            type="checkbox"
                                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <ErrorMessage name="userIsAdmin" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="userStatus">Status</label>
                                        <Field
                                            name="userStatus"
                                            type="checkbox"
                                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <ErrorMessage name="userStatus" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className='flex gap-3'>
                                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Atualizar Cadastro
                                        </button>
                                        <button type="button" onClick={closeModal} className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            {modalShow && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="bg-white p-6 rounded-md shadow-md flex items-center">
                        <span className={`material-icons text-4xl ${isError ? 'text-red-600' : 'text-green-600'}`}>
                            {isError ? 'error' : 'check_circle'}
                        </span>
                        <div className="ml-4">
                            <h2 className="text-lg font-bold mb-4">{isError ? 'Erro!' : 'Sucesso'}</h2>
                            <p>{modalMessage}</p>
                            <button onClick={closeModal} className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
