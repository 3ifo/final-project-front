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

  //functions for delete and update 

  const handleEditClick = (card) => {
    setEditCard({ ...card });
    setShowEditForm(true); 
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCard((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDelete = (_id) => {

    axios.delete(`${VITE_API_URL}/trainingcards/${_id}`, {
      headers: {
        Authorization: `Bearer ${VITE_TOKEN}`
      }
    }) 
      .then(() => {
        const updatedItems = cards.filter(card => card._id !== _id);
      setCards(updatedItems);
      setIsCardDelete(true)
      setTimeout(() => setIsCardDelete(false), 1000);

      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const saveCardChanges = () => {
    axios.patch(`${VITE_API_URL}/trainingcards/${editCard._id}`, editCard, {
      headers: {
        Authorization: `Bearer ${VITE_TOKEN}`
      }
    })
    .then(() => {
      myCardsFetch();
      setShowEditForm(false);
    })
    .catch(error => console.error("Error", error));
  };

  return (
    <main>
      {isSuccessMessageVisible && <div className="success-message">Created successfully</div>}
      <div>
        <h2>Crea una gymcard!</h2>
        
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
          <div>
          <button onClick={saveCardChanges}>Save Changes</button>
          <button onClick={()=> setShowEditForm(false)}>Close</button>
          </div>
          
        </dialog>
      )}
      
      <div className="card-container">
      
      {isCardDelete && <h4>Card deleted successfully</h4>}
        
        <div className="card"><button className="btn-open-modal" onClick={() => setOpenModal(true)}> <span className="navbar-icons"><IoAddCircleOutline /></span></button></div>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-name-image">
            <h3>{card.name}</h3>
            <img src={card.image} alt="" />
            </div>
            <p>Duration: {card.duration}</p>
            <p>Series: {card.series}</p>
            <p>Difficulty: {card.difficult}</p>
            <div>
            <button onClick={() => handleEditClick(card)}>Edit</button>
            <button onClick={() => handleDelete(card._id)}>Delete</button>
            <Link to={`/mygymcards/${card._id}`}> <button>See All</button></Link>
            </div>
            
          </div>
        ))}
      </div>
      

    </main>
  );
};

export default GymCards;