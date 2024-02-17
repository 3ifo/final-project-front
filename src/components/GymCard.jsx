import { useState, useEffect } from 'react';
import axios from '../library/axiosConfig';
import { useParams } from 'react-router-dom';
const { VITE_API_URL, VITE_TOKEN } = import.meta.env;

const GymCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCard, setEditCard] = useState({});

  const fetchCard = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/trainingcards/${id}`, {
        headers: {
          Authorization: `Bearer ${VITE_TOKEN}`
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCard(prev => ({ ...prev, [name]: value }));
  };

  const saveCardChanges = async () => {
    try {
      await axios.patch(`${VITE_API_URL}/trainingcards/${id}`, editCard, {
        headers: {
          Authorization: `Bearer ${VITE_TOKEN}`
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
      <h1>Your Card</h1>
      {card && (
        <div className='big-card-container'>
          <div className='single-card'>
          <img src={card.image} alt="" />
          <div className='single-card-text'>
          <h2>{card.name}</h2>
          <p>Training Exercises: {card.exercises}</p>
          <p>Duration: {card.duration}</p>
            <p>Series: {card.series}</p>
            <p>Type: {card.type}</p>
            <p>Difficulty:{card.difficult}</p>
            <p>Notes: {card.notes}</p>
            <p>{card.created}</p>
          </div>
         
          </div>
          
          
          <button className='edit-btn' onClick={() => setShowEditForm(true)}>Edit your card</button>
          {showEditForm && (
            <dialog className="edit-form">
            <label>Name</label>
          <input name="name" placeholder="Name" value={editCard.name} onChange={handleEditChange} />
          <label>Exercises</label>
          <input name="exercises" placeholder="Exercises" value={editCard.exercises} onChange={handleEditChange} />
          <label>Series</label>
          <input name="series" placeholder="Series" value={editCard.series} onChange={handleEditChange} />
          <label >Type of Training</label>
          <input name="type" placeholder="Type (Write aerobic or anaerobic)" value={editCard.type} onChange={handleEditChange} />
          <label>Duration</label>
          <input name="duration" placeholder="Duration" value={editCard.duration} onChange={handleEditChange} />
          <label>Difficult</label>
          <input name="difficult" placeholder="Difficulty (Write easy, medium, hard)" value={editCard.difficult} onChange={handleEditChange} />
          <label>IMG</label>
          <input name="image" placeholder="Insert img link" value={editCard.image} onChange={handleEditChange} />
          <label>Notes</label>
          <textarea cols="40" rows="5" name="notes" placeholder="Notes" value={editCard.notes} onChange={handleEditChange} />
              <div>
              <button onClick={saveCardChanges}>Save Changes</button>
              <button onClick={()=> setShowEditForm(false)}>Close</button>
                </div>
            </dialog>
          )}
        </div>
      )}
    </>
  );
};

export default GymCard;
