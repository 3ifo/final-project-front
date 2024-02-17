import { useState } from "react"
import axios from "../library/axiosConfig";
const { VITE_API_URL } = import.meta.env;
const {VITE_TOKEN}= import.meta.env;


export const CreateModal = ({ openModal, setOpenModal, onCardCreated})=> {

    const createGymCards = (obj)=> {
        axios.post (`${VITE_API_URL}/trainingcards/mygymcards`, obj, {
          headers: {
            authorization: `Bearer ${VITE_TOKEN}`
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
        type: "",
        duration:"",
        image:"",
        notes:""
    })

    return (
        <>
        <dialog  id="create-modal-container">
          <h3>Create your custom card</h3>
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
        <label>Type of Training</label>
      <select 
       value={data.type}
        onChange={(e) => setData((curr) => ({
       ...curr,
        type: e.target.value
       }))}>
      <option  value="aerobic">Aerobic</option>
      <option  value="anaerobic">Anaerobic</option>
      </select>
        <label>Duration</label>
        <input 
        value={data.duration}
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
  <option  value="easy">Easy</option>
  <option  value="medium">Medium</option>
  <option value="hard">Hard</option>
</select>
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
        cols="40" 
        rows="5"
        value={data.notes}
        type="text"
        onChange={(e) => setData((curr) => ({
          ...curr,
          notes: e.target.value
      }))}
        ></textarea>
    <div>
 <button onClick={()=> createGymCards(data)}>Create</button>
      <button onClick={()=> setOpenModal(false)}>Cancel</button>
     </div>
        </dialog>
        </>
    )
}