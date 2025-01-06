import './AddOne.css'
import { IoIosAdd } from 'react-icons/io'

function AddOne(props) {
    return (
        <div className='add-container'>
            <IoIosAdd /> <p>{props.textContent}</p>
        </div>
    )
}

export default AddOne
