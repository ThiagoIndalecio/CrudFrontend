import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './ModalUpdateUser.jsx';
import DeleteModal from './DeleteModal.jsx';

export default function ListClients() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                
                const response = await axios.get('http://localhost:3000/api/user/list');
                console.log(response.data.users)
                setUsers(response.data.users);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar usuarios.');
                setLoading(false);
            }
          
        };
        
        fetchClients();
    }, []);

    const handleModalShow = (user) => {
        console.log(user)
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleDeleteModalShow = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleDeleteConfirm = async () => {
        
        try {
            await axios.post(`http://localhost:3000/api/user/deleteRegister`, {
                id: selectedUser.id 
            });
            //setClients(clients.filter(client => client.id !== selectedClient.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-1">Lista de Usuários</h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse">
                        <thead className="text-xs text-white uppercase bg-indigo-600">
                            <tr>
                                <th className="px-6 py-3">Nome</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Admin</th>
                                <th className="px-6 py-3">Alterar</th>
                                <th className="px-6 py-3">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="odd:bg-slate-200 even:bg-gray-50 border-b">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.status ? 'Ativo' : 'Inativo'}</td>
                                    <td className="px-6 py-4">{user.is_admin ? 'Sim' : 'Não'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleModalShow(user)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Alterar
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteModalShow(user)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <Modal
                    initialValues={{
                        userName: selectedUser?.name || "",
                        userEmail: selectedUser?.email || "",
                        userSenha: selectedUser?.password || "",
                        userStatus: selectedUser?.status || false,
                        userAdmin: selectedUser?.is_admin || false

                    }}
                    closeModal={handleModalClose}
                    userData={selectedUser}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    
                    closeModal={handleDeleteModalClose}
                    confirmDelete={handleDeleteConfirm}
                />
            )}
        </div>
    );
}
