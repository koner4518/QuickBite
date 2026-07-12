import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function List({url}){

    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if(response.data.success) {
                setList(response.data.data);
            }
            else {
                toast.error("Error");
            }
        } catch (error) {
            if (!error.response) {
                toast.info("Backend is starting. Please wait 30-60 seconds and try again.");
            }
            else {
                toast.error(error.response?.data.message);
                console.log(error.response?.data.message);
            }
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, {id : foodId});
        await fetchList();

        if(response.data.success){
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    }

    useEffect(()=>{
        fetchList();
    }, []);
    return (
        <>
        {list.length === 0
        ? <p className='empty'>List is empty</p> :
        <div className='list add flex-col'>
            <p>All Foods List</p>

            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={item.image.url} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>&#8377;{item.price}</p>
                            <p className='cursor' onClick={()=> removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div> }
        </>
    )
}