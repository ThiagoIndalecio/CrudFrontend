import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './ModalUpdateUser';
import DeleteModal from './DeleteModal';

export default function ListClients() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                
                const response = await axios.get('http://localhost:3000/api/client/list');
                
                setClients(response.data.clients);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar clientes.');
                setLoading(false);
            }
        
        };
        
        fetchClients();
    }, []);

    const handleModalShow = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedClient(null);
    };

    const handleDeleteModalShow = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setSelectedClient(null);
    };

    const handleDeleteConfirm = async () => {
        
        try {
            await axios.post(`http://localhost:3000/api/client/deleteRegister`, {
                id: selectedClient.id
            });
            setClients(clients.filter(client => client.id !== selectedClient.id));
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
    if (clients.length == 0){
        return <div>Não há clientes cadastrados...</div>
    }
    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-1">Lista de Clientes</h1>
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
                                <th className="px-6 py-3">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="odd:bg-slate-200 even:bg-gray-50 border-b">
                                    <td className="px-6 py-4">{client.cli_name}</td>
                                    <td className="px-6 py-4">{client.cli_email}</td>
                                    <td className="px-6 py-4">{client.cli_phone}</td>
                                    <td className="px-6 py-4">{client.cli_cpf}</td>
                                    <td className="px-6 py-4">{client.cli_status ? 'Ativo' : 'Inativo'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleModalShow(client)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Alterar
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteModalShow(client)}
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
                        cliName: selectedClient?.cli_name || "",
                        cliEmail: selectedClient?.cli_email || "",
                        cliPhone: selectedClient?.cli_phone || "",
                        cliCpf: selectedClient?.cli_cpf || "",
                        cliStatus: selectedClient?.cli_status || false
                    }}
                    closeModal={handleModalClose}
                    clientData={selectedClient}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    clientData={selectedClient}
                    closeModal={handleDeleteModalClose}
                    confirmDelete={handleDeleteConfirm}
                />
            )}
        </div>
    );
}
