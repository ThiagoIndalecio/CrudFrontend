import{ React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, replace } from "formik";
import '../src/index.css';
import * as yup from "yup";
import axios from "axios";
import LoginModal from '../components/LoginModal.jsx'

export default function FormLogin() {
    const [openModal,setOpenModal] = useState(false)
   
    const handleCloseModal = () =>{
        setOpenModal(false)
    }


    const navigate = useNavigate();
    const initialValues = {
        userEmail: "",
        userPassword: "",
    };

    const validationSchema = yup.object({
        userEmail: yup.string().email("Insira um e-mail válido").required("E-mail é obrigatório"),
        userPassword: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
    });

    const handleSubmit = async (values) =>{
       
        await axios.post('http://localhost:3000/api/user/login',{
            email: values.userEmail,
            password: values.userPassword
        }).then((response) => {
            
            console.log(response)
            if (response.data.user){
                navigate('/vet', {replace:true})
                
            }else{
                setOpenModal(true)
            }
                     
        }
    )   
    

    }
      

    return (
        <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
        
                <Form className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg shadow-black/20">
                    <h1 className="text-3xl font-bold mb-1">Login</h1>
                    <p className="mb-4 text-gray-500">Insira as informações para logar na sua conta</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                name="userEmail"
                                type="email"
                                placeholder="Insira seu e-mail"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="userEmail" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Senha</label>
                            <Field
                                name="userPassword"
                                type="password"
                                placeholder="Insira uma senha"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="userPassword" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <button
                                type="submit"
                                
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                               
                            >
                                Login
                            </button>
                        </div>

                    </div>
                </Form>
            
        </Formik>
        {openModal && (
                <LoginModal
                   
                closeModal={handleCloseModal}
                    
                />
            )}
        </>
    );
}
