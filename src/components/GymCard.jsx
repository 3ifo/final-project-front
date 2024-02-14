import { useParams } from "react-router-dom"

const GymCard = ()=> {
 const {id} = useParams()

    return (
        <>
        
        <h1>Your Card</h1>
        <div>Ciao `${id}` </div>
        </>
    )
}




export default GymCard