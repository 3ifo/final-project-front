import { useState, useEffect } from "react";
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;
import { CreateModal } from "./CreateModal";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const GymCards = () => {
  const [openModal,setOpenModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [isCardDelete, setIsCardDelete] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(null);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [cards, setCards] = useState([])

  //Recupero il token dal local storage

  const getToken = () => localStorage.getItem('token');


  const myCardsFetch = async () => {
    try {
      const token = getToken()
      const response = await fetch(`${VITE_API_URL}/trainingcards/mygymcards`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
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
//Le mie funzioni per il delete di una card
const showDeleteConfirmModal = (cardId) => {
  setCurrentCardId(cardId);
  setIsConfirmModalVisible(cardId);
};

const handleDelete = () => {
  const token = getToken()
  axios.delete(`${VITE_API_URL}/trainingcards/${currentCardId}`, {
    headers: {
      Authorization: `Bearer ${token}`
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

      <div className="your-gymcards-div">
        <h2 className="your-gymcards"> <strong>Track</strong> your <strong>fitness</strong> activities</h2>
        <p>Incorporating both cardiovascular (cardio) and weight training into your fitness routine is crucial for achieving a well-rounded and healthy lifestyle. Cardio exercises improve heart health, endurance, and aid in weight loss by burning calories. On the other hand, weight training is essential for building muscle strength, enhancing bone density, and boosting metabolism. Combining these two types of workouts ensures a balanced approach to fitness, promoting both heart health and muscular development, which can lead to improved overall physical performance and well-being.</p>
      </div>
      {openModal && <CreateModal openModal={openModal} onCardCreated={handleCardCreated} setOpenModal={setOpenModal} />}
      
      
      <div className="card-container">
      
      {isCardDelete && <h4>Card deleted successfully</h4>}
        
        <div className="create">
        <h3>Create your <strong id="card-create-strong">card!</strong> </h3>
        <span id="create-card-btn" onClick={() => setOpenModal(true)}><IoAddCircleOutline /></span>
        

        </div>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-name-image">
            <h3>{card.name}</h3>
            <img src={card.image} alt="" />
            </div>
            <p className="duration">{card.duration}m</p> <hr />
            <p className="type">{card.type}</p> <hr />
            <p className="difficult">{card.difficult}</p>
            <div className="details-delete-btn">
            <Link to={`/mygymcards/${card._id}`}> <button className="details-btn">Details</button></Link>
            <button className="delete-btn" onClick={() => showDeleteConfirmModal(card._id)}>Delete</button>
            </div>
            {isConfirmModalVisible === card._id && (
        <div className="delete-confirm-modal show">
          <p>Are you sure you want to delete this card? </p>
          <div>
          <button className="confirm-delete" onClick={handleDelete}>Confirm</button>
          <button className="no-confirm-delete" onClick={() => setIsConfirmModalVisible(null)}>Back</button>
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