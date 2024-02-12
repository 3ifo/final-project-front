import { useState, useEffect } from "react";
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;
const {VITE_TOKEN}= import.meta.env;
import { CreateModal } from "./CreateModal";

const GymCards = () => {
  const [openModal,setOpenModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
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
    myCardsFetch(); // Aggiorna l'elenco delle cards
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
    <>
    <div>
      <h2>Crea una gymcard!</h2>
      {isSuccessMessageVisible && <div className="success-message"><h4>Created successfully</h4></div>}     
      {openModal && <CreateModal openModal={openModal} onCardCreated={handleCardCreated}  setOpenModal={setOpenModal}/>}
    </div>
    <div>

    </div>
    <button onClick={()=> setOpenModal(true)}>Open</button>
    {cards.map((card,key)=> {
      return (
        <div key={key}>
          <h3>Name: {card.name}</h3>
          <p>Duration: {card.duration}</p>
          <p>Exercises: {card.exercises}</p>
          <p>Series: {card.series}</p>
          <p>Difficult: {card.difficult}</p>
          <button onClick={() => handleEditClick(card)}>Edit</button>
          <button onClick={()=> handleDelete(card._id)}>Delete</button>
        </div>
      )
    })}

{showEditForm && (
    <div>
      <input name="name" placeholder="name" onChange={handleEditChange} />
      <input name="exercises" placeholder="exercises"  onChange={handleEditChange} />
      <input name="series" placeholder="series"  onChange={handleEditChange} />
      <input name="duration" placeholder="duration"  onChange={handleEditChange} />
      <input name="difficult" placeholder="Put easy,medium or hard"  onChange={handleEditChange} />
      <button onClick={saveCardChanges}>Save</button>
      
    </div>
  )}
    </>
  );
};

export default GymCards;
