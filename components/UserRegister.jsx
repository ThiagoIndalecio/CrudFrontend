import {React,useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import '../src/index.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormRegister() {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false)


    const initialValues = {
        userName: "",
        userEmail: "",
        userPassword: "",
        userPasswordConfirm: ""
    };

    const validationSchema = yup.object({
        userName: yup.string().required("Nome é obrigatório"),
        userEmail: yup.string().email("Insira um e-mail válido").required("E-mail é obrigatório"),
        userPassword: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
        userPasswordConfirm: yup.string().oneOf([yup.ref('userPassword'), null], "As senhas não conferem").required("Confirmação de senha é obrigatória")
    });

    const handleSubmit = async (values) => {
        
    try  {
        const response = await axios.post('http://localhost:3000/api/user/register',{
            name: values.userName,
            email: values.userEmail,
            password: values.userPassword

        })
        if(response){
            if (!response.data.userExist){
                console.log(response)
                setModalMessage(response.data.message)
                setIsError(false)
                setModalOpen(true)
            } else {
                console.log(response)
                setModalMessage(response.data.message)
                setIsError(true)
                setModalOpen(true)
            }
            
            
        }
        }
    catch (e){
        setIsError(true)
        setModalOpen(true)
        console.log(e)
    }    
    };

    const closeModal = () =>{
        setModalOpen(false)
    }

    return (
        <div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            
                <Form className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg shadow-black/20">
                    <h1 className="text-3xl font-bold mb-1">Cadastrar</h1>
                    <p className="mb-4 text-gray-500">Insira as informações para criar sua conta!</p>

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="userName">Nome</label>
                                <Field
                                    name="userName"
                                    type="text"
                                    placeholder="Insira seu nome"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
                            </div>
                            
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email</label>
                            <Field
                                name="userEmail"
                                type="email"
                                placeholder="Insira seu e-mail"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userPassword">Senha</label>
                            <Field
                                name="userPassword"
                                type="password"
                                placeholder="Insira uma senha"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="userPassword" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="userPasswordConfirm">Confirme sua senha</label>
                            <Field
                                name="userPasswordConfirm"
                                type="password"
                                placeholder="Confirme a senha"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="userPasswordConfirm" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Criar Conta
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
);}
