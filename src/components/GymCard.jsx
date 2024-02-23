import { useState, useEffect } from 'react';
import axios from '../library/axiosConfig';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
const { VITE_API_URL} = import.meta.env;






const GymCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCard, setEditCard] = useState({});

  //Prendo il token dal local storage

  const getToken = () => localStorage.getItem('token');

  const fetchCard = async () => {
    try {
      const token = getToken()
      const response = await axios.get(`${VITE_API_URL}/trainingcards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCard(response.data);
      setEditCard(response.data);
    } catch (error) {
      console.error('Error fetching card', error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, [id]);

  // Funzioni per updatare le proprietà della card e in seguito salvare

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCard(prev => ({ ...prev, [name]: value }));
  };

  const saveCardChanges = async () => {
    try {
      const token = getToken()
      await axios.patch(`${VITE_API_URL}/trainingcards/${id}`, editCard, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowEditForm(false);
      fetchCard();
    } catch (error) {
      console.error('Error updating card', error);
    }
  };



  return (
    <>

        <h1 id='your-card-h1'>Your Card </h1>
      {card && (
        <div className='big-card-container'>
          
          <div className='single-card'>
            <div className='single-card-overlay'></div>
            <div className='container-max-width'>
              <img src={card.image} alt="" /> 
            <p id='single-card-exercises'> <strong id='strong-exercises'>Training Exercises:</strong> <br /> {card.exercises}</p> <hr />
            </div>
          
          <div className='single-card-text'>

            <h2 className='single-card-name'>{card.name} </h2>

          
          
          <p className='single-card-duration'><strong className='single-gymcard-strong'>Duration:</strong>  {card.duration}m</p>
            <p className='single-card-series'><strong className='single-gymcard-strong'>Series:</strong> {card.series}</p>
            <p className='single-card-type'><strong className='single-gymcard-strong'>Type: </strong>{card.type}</p>
            <p className='single-card-difficult'><strong className='single-gymcard-strong'>Difficult: </strong>{card.difficult}</p>
            <p className='single-card-notes'><strong className='single-gymcard-strong'>Notes:</strong> {card.notes}</p>
            <p className='single-card-created'>Training date: {dayjs(card.created).format('YYYY-MM-DD')}</p>
            
          <button className='edit-btn' onClick={() => setShowEditForm(true)}>Edit your card</button>
          
          </div>
          </div>
          
          {/* <div className='edit-btn-div'>
          <button className='edit-btn' onClick={() => setShowEditForm(true)}>Edit your card</button>
          </div> */}
          
          {showEditForm && (
            
            <dialog className="edit-form">
            <label>Name</label>
          <input name="name" placeholder="Name" value={editCard.name} onChange={handleEditChange} />
          <label>Exercises</label>
          <input name="exercises" placeholder="Exercises" value={editCard.exercises} onChange={handleEditChange} />
          <label>Series</label>
          <input name="series" placeholder="Series" value={editCard.series} onChange={handleEditChange} />
          <label >Type of Training</label>
          <input name="type" placeholder="Type (Cardio or Bulk)" value={editCard.type} onChange={handleEditChange} />
          <label>Duration</label>
          <input name="duration" placeholder="Duration" value={editCard.duration} onChange={handleEditChange} />
          <label>Difficult</label>
          <input name="difficult" placeholder="Difficulty (Write easy, medium, hard)" value={editCard.difficult} onChange={handleEditChange} />
          <label>IMG</label>
          <input name="image" placeholder="Insert img link" value={editCard.image} onChange={handleEditChange} />
          <label>Notes</label>
          <input name="notes" placeholder="Notes" value={editCard.notes} onChange={handleEditChange} />
              <div className='create-cancel-btn'>
              <button className='create-modal-btn' onClick={saveCardChanges}>Save Changes</button>
              <button className='cancel-modal-btn' onClick={()=> setShowEditForm(false)}>Close</button>
                </div>
            </dialog>
          )}
        </div>
      )}
    </>
  );
};

export default GymCard;
