import { useState, useEffect } from "react";
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;
const {VITE_TOKEN}= import.meta.env;
import { CreateModal } from "./CreateModal";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const GymCards = () => {
  const [openModal,setOpenModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [isCardDelete, setIsCardDelete] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(null);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [cards, setCards] = useState([])

  const myCardsFetch = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/trainingcards/mygymcards`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${VITE_TOKEN}` 
        }
      });
      const result = await response.json();
      setCards(result);
    } catch (error) {
      console.error("Error", error);
    }
  };


  useEffect(()=> {
    myCardsFetch()
  }, [])

  const handleCardCreated = () => {
    setIsSuccessMessageVisible(true);
    setTimeout(() => setIsSuccessMessageVisible(false), 3000);
    myCardsFetch(); 
};
//My delete functions
const showDeleteConfirmModal = (cardId) => {
  setCurrentCardId(cardId);
  setIsConfirmModalVisible(cardId);
};

const handleDelete = () => {
  axios.delete(`${VITE_API_URL}/trainingcards/${currentCardId}`, {
    headers: {
      Authorization: `Bearer ${VITE_TOKEN}`
    }
  }) 
    .then(() => {
      const updatedItems = cards.filter(card => card._id !== currentCardId);
      setCards(updatedItems);
      setIsCardDelete(true);
      setTimeout(() => setIsCardDelete(false), 1000);
      setIsConfirmModalVisible(null);
    })
    .catch(error => {
      console.error("Error:", error);
    });
};


  return (
    <main>
        {(openModal || isConfirmModalVisible !== null) && <div className="backdrop show"></div>}
      {isSuccessMessageVisible && <div className="success-message">Created successfully</div>}
      <div>
        <h2 className="your-gymcards">Your GymCards</h2>
      </div>
      {openModal && <CreateModal openModal={openModal} onCardCreated={handleCardCreated} setOpenModal={setOpenModal} />}
      {showEditForm && (
  
        <dialog className="edit-form">
          <label>Name</label>
          <input name="name" placeholder="Name" value={editCard.name} onChange={handleEditChange} />
          <label>Exercises</label>
          <input name="exercises" placeholder="Exercises" value={editCard.exercises} onChange={handleEditChange} />
          <label htmlFor="">Series</label>
          <input name="series" placeholder="Series" value={editCard.series} onChange={handleEditChange} />
          <label>Duration</label>
          <input name="duration" placeholder="Duration" value={editCard.duration} onChange={handleEditChange} />
          <label>Difficult</label>
          <input name="difficult" placeholder="Difficulty (easy, medium, hard)" value={editCard.difficult} onChange={handleEditChange} />
          <label>IMG</label>
          <input name="img" placeholder="Insert img link" value={editCard.image} onChange={handleEditChange} />
          <label>Notes</label>
          <input name="notes" placeholder="Notes" value={editCard.notes} onChange={handleEditChange} />
          <div>
          <button onClick={saveCardChanges}>Save Changes</button>
          <button onClick={()=> setShowEditForm(false)}>Close</button>
          </div>
          
        </dialog>
      )}
      
      <div className="card-container">
      
      {isCardDelete && <h4>Card deleted successfully</h4>}
        
        <div className="create">
        <h3>Create your card!</h3>
        <span id="create-card-btn" onClick={() => setOpenModal(true)}><IoAddCircleOutline /></span>
        

        </div>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-name-image">
            <h3>{card.name}</h3>
            <img src={card.image} alt="" />
            </div>
            <p className="duration">{card.duration}m</p> <hr />
            {/* <p>Series: {card.series}</p> */}
            <p className="type">{card.type}</p> <hr />
            <p className="difficult">{card.difficult}</p>
            {/* <p>{card.created}</p> */}
            <div className="details-delete-btn">
            <Link to={`/mygymcards/${card._id}`}> <button className="details-btn">Details</button></Link>
            <button className="delete-btn" onClick={() => showDeleteConfirmModal(card._id)}>Delete</button>
            </div>
            {isConfirmModalVisible === card._id && (
        <div className="delete-confirm-modal show">
          <p>Are you sure you want to delete this card? </p>
          <div>
          <button onClick={handleDelete}>Confirm</button>
          <button onClick={() => setIsConfirmModalVisible(null)}>Back</button>
          </div>
          
        </div>
        )}

        </div>
        ))}
      </div>
      

    </main>
  );
};

export default GymCards;