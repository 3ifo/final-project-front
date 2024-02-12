import { useState, useEffect } from "react";
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;

const GymCards = () => {

  const [cards, setCards] = useState([])
  const [editCard, setEditCard] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const myCardsFetch = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/trainingcards/mygymcards`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM5MGFhNjcwYTBhNzE3ZTk2ZDZjZTMiLCJpYXQiOjE3MDc3MDEwNzEsImV4cCI6MTcxMDI5MzA3MX0.xKKOhtm7TIfR-V7GOrrJ_f1K0CI09b37iPXT2EXNez0` 
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM5MGFhNjcwYTBhNzE3ZTk2ZDZjZTMiLCJpYXQiOjE3MDc3MDEwNzEsImV4cCI6MTcxMDI5MzA3MX0.xKKOhtm7TIfR-V7GOrrJ_f1K0CI09b37iPXT2EXNez0`
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM5MGFhNjcwYTBhNzE3ZTk2ZDZjZTMiLCJpYXQiOjE3MDc3MDEwNzEsImV4cCI6MTcxMDI5MzA3MX0.xKKOhtm7TIfR-V7GOrrJ_f1K0CI09b37iPXT2EXNez0`
      }
    })
    .then(() => {
      myCardsFetch();
      setShowEditForm(false);
    })
    .catch(error => console.error("Error", error));
  };


  const [data,setData] = useState ({
      name: "",
      exercises: "",
      series: "",
      duration:"",
      image:"",
      notes:""
  })

  const createGymCards = (obj)=> {
    axios.post (`${VITE_API_URL}/trainingcards/mygymcards`, obj, {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM5MGFhNjcwYTBhNzE3ZTk2ZDZjZTMiLCJpYXQiOjE3MDc3MDEwNzEsImV4cCI6MTcxMDI5MzA3MX0.xKKOhtm7TIfR-V7GOrrJ_f1K0CI09b37iPXT2EXNez0`
      } 
    })
    
    .then(response => {
      setCards(currentCards => [...currentCards, response.data]);
      setData({
        name: "",
        exercises: "",
        series: "",
        duration: "",
        image: "",
        notes: ""
      });
    })
    .catch(error => console.error("Error", error));
  }


  return (
    <>
    <div>
      <h1>Queste sono le tue gymcards</h1>
      <h2>Crea una gymcard!</h2>

      <div>
        <label>Name</label>
        <input 
        value={data.name}
        type="text" 
        onChange={(e) => setData((curr) => ({
          ...curr,
          name: e.target.value   
      }))}
        />
          <label>Exercises</label>
        <input 
        value={data.exercises}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          exercises: e.target.value   
      }))}
        />
           <label>Series</label>
        <input 
        value={data.series}
        type="number"
        onChange={(e) => setData((curr) => ({
          ...curr,
          series: e.target.value   
      }))}
        />
        <label>Duration</label>
        <input 
        value={data.duration}
        type="number"
        onChange={(e) => setData((curr) => ({
          ...curr,
          duration: e.target.value
      }))}
        />
             <label>IMG</label>
        <input 
        value={data.image}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          image: e.target.value
      }))}
        />
        <label>Notes</label>
        <textarea 
        name="" 
        id="" 
        cols="30" 
        rows="10"
        value={data.notes}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          notes: e.target.value
      }))}
        ></textarea>
      </div>
      <button onClick={()=> createGymCards(data)}>Create</button>
    </div>
    <div>

    </div>
    {cards.map((card,key)=> {
      return (
        <div key={key}>
          <h3>Name: {card.name}</h3>
          <p>Duration: {card.duration}</p>
          <p>Exercises: {card.exercises}</p>
          <p>Series: {card.series}</p>
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
      <button onClick={saveCardChanges}>Save</button>
      
    </div>
  )}
    </>
  );
};

export default GymCards;
