import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import '../src/index.css';
import axios from "axios";

export default function FormRegister() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const initialValues = {
        cliName: "",
        cliEmail: "",
        cliPhone: "",
        cliCpf: ""
    };

    const validationSchema = yup.object({
        cliName: yup.string().required("Nome é obrigatório"),
        cliEmail: yup.string().email("Insira um e-mail válido").required("E-mail é obrigatório"),
        cliPhone: yup.string().required("Telefone é obrigatório"),
        cliCpf: yup.string().required("CPF é obrigatório").max(11, 'O CPF só pode conter 11 números').min(11, 'Insira um CPF válido')
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/api/client/register', {
                name: values.cliName,
                email: values.cliEmail,
                phone: values.cliPhone,
                cpf: values.cliCpf
            });

            console.log(response.data.userExist);
            if(response.data.userExist){
                setIsError(true);
            }
            else{
                setIsError(false);
            }
            setModalOpen(true);
            setModalMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response ? error.response.data.message : 'Erro ao cadastrar o cliente');
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalMessage('');
    };

    return (
        <div>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg shadow-black/20">
                    <h1 className="text-3xl font-bold mb-1">Cadastrar Cliente</h1>
                    <p className="mb-4 text-gray-500">Insira as informações para o cadastro!</p>

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="userName">Nome</label>
                                <Field
                                    name="cliName"
                                    type="text"
                                    placeholder="Nome do cliente"
                                    className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="cliName" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email</label>
                            <Field
                                name="cliEmail"
                                type="email"
                                placeholder="E-mail do cliente"
                                className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliEmail" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userPassword">Telefone</label>
                            <Field
                                name="cliPhone"
                                type="tel"
                                placeholder="Telefone do cliente"
                                className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliPhone" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userPasswordConfirm">CPF</label>
                            <Field
                                name="cliCpf"
                                type="text"
                                placeholder="Cpf do cliente"
                                className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="cliCpf" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Criar Cadastro
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>

            {modalOpen && (
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
}
