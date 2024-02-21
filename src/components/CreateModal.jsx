import { useState } from "react"
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;




export const CreateModal = ({ openModal, setOpenModal, onCardCreated})=> {
  //Prendo il token dal local storage
  const getToken = () => localStorage.getItem('token');

    const createGymCards = (obj)=> {
      const token = getToken()
        axios.post (`${VITE_API_URL}/trainingcards/mygymcards`, obj, {
          headers: {
            authorization: `Bearer ${token}`
          } 
        })
        
        .then(response => {
          setData({
            name: "",
            exercises: "",
            series: "",
            type: "",
            duration: "",
            difficult:"",
            image: "",
            notes: ""
          });
          onCardCreated();
          setOpenModal(false)
        })
        .catch(error => console.error("Error", error));
      }

    const [data,setData] = useState ({
        name: "",
        exercises: "",
        series: "",
        type: "bulk",
        duration:"",
        difficult:"easy",
        image:"",
        notes:""
    })

    return (
        <>
        <dialog  id="create-modal-container">
          <h3>Create your custom card</h3>
        <label>Name *</label>
        <input 
        value={data.name}
        required
        placeholder="Enter a minimum of 5 characters and a maxiumum of 15 characters"
        type="text" 
        onChange={(e) => setData((curr) => ({
          ...curr,
          name: e.target.value   
      }))}

        />
        <label>Exercises*</label>
        <textarea 
        name=""
        placeholder="Enter a minimum of 10 characters and a maximum of 200 characters"
        id=""
        required
        cols="40" 
        rows="5"
        value={data.exercises}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          exercises: e.target.value
      }))}
        ></textarea>
           <label>Series *</label>
        <input 
        value={data.series}
        type="number"
        onChange={(e) => setData((curr) => ({
          ...curr,
          series: e.target.value   
      }))}
        />
        <label>Type of Training *</label>
      <select
       value={data.type}
        onChange={(e) => setData((curr) => ({
       ...curr,
        type: e.target.value
       }))}>
      <option  value="bulk">Bulk</option>
      <option  value="cardio">Cardio</option>
      </select>
        <label>Duration *</label>
        <input 
        value={data.duration}
        required
        type="number"
        onChange={(e) => setData((curr) => ({
          ...curr,
          duration: e.target.value
      }))}
        />
<label>Difficult</label>
<select 
  value={data.difficult}
  onChange={(e) => setData((curr) => ({
    ...curr,
    difficult: e.target.value
  }))}>
  <option  value="easy">Easy </option>
  <option  value="medium">Medium </option>
  <option  value="hard">Hard</option>
</select>
        <label>IMG *</label>
        <input 
        value={data.image}
        placeholder="Paste the link of the image you want to insert"
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          image: e.target.value
      }))}
        />
        <label>Notes</label>
        <textarea 
        name=""
        placeholder="Enter a maximum of 150 characters"
        id="" 
        cols="40" 
        rows="5"
        value={data.notes}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,

          notes: e.target.value
      }))}
        ></textarea>
    <div className="create-cancel-btn">
 <button className="create-modal-btn" onClick={()=> createGymCards(data)}>Create</button>
      <button className="cancel-modal-btn" onClick={()=> setOpenModal(false)}>Cancel</button>
     </div>
        </dialog>
        </>
    )
}