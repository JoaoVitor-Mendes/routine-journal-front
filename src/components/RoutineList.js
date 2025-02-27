import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import RoutineForm from './RoutineForm'; // Importe o componente reutilizável
import '../assets/css/RoutineList.css';
import '../assets/css/ModalMessage.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

Modal.setAppElement('#root');

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutines = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/routines-journals`, {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setRoutines(response.data);
          setLoading(false);
        } else {
          console.error('Erro ao carregar rotinas:', response.status);
        }
      } catch (error) {
        console.error('Erro ao carregar rotinas:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleView = (routine) => {
    setSelectedRoutine(routine);
    setViewModalIsOpen(true);
  };

  const handleEdit = (routine) => {
    setSelectedRoutine(routine);
    setEditModalIsOpen(true);
  };

  const handleUpdateRoutine = async (updatedRoutine) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/routines-journals/${selectedRoutine.id}`,
        updatedRoutine,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRoutines(routines.map(routine =>
          routine.id === selectedRoutine.id ? { ...routine, ...updatedRoutine } : routine
        ));
        setEditModalIsOpen(false);
      } else {
        alert('Erro ao atualizar rotina. Tente novamente!');
      }
    } catch (error) {
      console.error('Erro ao atualizar rotina:', error);
      alert('Ocorreu um erro ao tentar atualizar sua rotina!');
    }
  };

  const openDeleteModal = (routineId) => {
    setRoutineToDelete(routineId);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalIsOpen(false);
    setRoutineToDelete(null);
  };

  const handleDelete = async () => {
    if (!routineToDelete) return;

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/routines-journals/${routineToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRoutines(routines.filter(routine => routine.id !== routineToDelete));
      } else {
        alert('Erro ao excluir rotina. Tente novamente!');
      }
    } catch (error) {
      console.error('Erro ao excluir rotina:', error);
      alert('Ocorreu um erro ao tentar excluir sua rotina!');
    }

    closeDeleteModal();
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  if (loading) {
    return <p>Carregando rotinas...</p>;
  }

  return (
    <div className="routine-list-container">
      <h1>Minhas Rotinas Diárias</h1>
      <button className="back-btn" onClick={handleGoBack}>
        Voltar para Home
      </button>
      {routines.length === 0 ? (
        <p>Nenhuma rotina cadastrada ainda.</p>
      ) : (
        routines.map(routine => (
          <div key={routine.id} className="routine-card-container">
            <div className="routine-card">
              <h2>{new Date(routine.date).toLocaleDateString('pt-BR')}</h2>
              <hr className="routine-divider" />
              <p>{routine.description}</p>
            </div>
            <div className="routine-actions">
              <FontAwesomeIcon icon={faEye} className="action-icon" onClick={() => handleView(routine)} />
              <FontAwesomeIcon icon={faEdit} className="action-icon" onClick={() => handleEdit(routine)} />
              <FontAwesomeIcon icon={faTrash} className="action-icon" onClick={() => openDeleteModal(routine.id)} />
            </div>
          </div>
        ))
      )}

      {/* Modal de Visualização */}
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={() => setViewModalIsOpen(false)}
        style={customStyles}
        contentLabel="Visualizar Rotina"
      >
        <h2>Visualizar Rotina</h2>
        <RoutineForm routine={selectedRoutine} isViewMode={true} />
        <button onClick={() => setViewModalIsOpen(false)}>Fechar</button>
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        style={customStyles}
        contentLabel="Editar Rotina"
      >
        <h2>Editar Rotina</h2>
        <RoutineForm routine={selectedRoutine} onSubmit={handleUpdateRoutine} isViewMode={false} />
        <button onClick={() => setEditModalIsOpen(false)}>Cancelar</button>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Confirmar exclusão"
      >
        <p>Tem certeza que deseja excluir esta rotina?</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="modal-confirm-btn">
            Confirmar
          </button>
          <button onClick={closeDeleteModal} className="modal-cancel-btn">
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RoutineList;