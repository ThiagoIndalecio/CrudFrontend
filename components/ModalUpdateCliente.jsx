import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

export default function ModalUpdateClient({ initialValues, closeModal, clientData }) {
    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:3000/api/client/update', {
                id: clientData.id,
                name: values.cliName,
                email: values.cliEmail,
                phone: values.cliPhone,
                cpf: values.cliCpf,
                status: values.cliStatus
            });
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Atualizar Cliente</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="cliName">Nome</label>
                            <Field
                                name="cliName"
                                type="text"
                                placeholder="Nome"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliName" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="cliEmail">Email</label>
                            <Field
                                name="cliEmail"
                                type="email"
                                placeholder="Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliEmail" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="cliPhone">Telefone</label>
                            <Field
                                name="cliPhone"
                                type="text"
                                placeholder="Telefone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliPhone" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="cliCpf">CPF</label>
                            <Field
                                name="cliCpf"
                                type="text"
                                placeholder="CPF"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliCpf" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="userStatus">Status</label>
                                        <Field
                                            name="cliStatus"
                                            type="checkbox"
                                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <ErrorMessage name="cliStatus" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-md">Cancelar</button>
                            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md">Salvar</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
