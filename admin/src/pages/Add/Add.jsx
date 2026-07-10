import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Add({url}){

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(prev => ({...prev, [name] : value}));

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log(response);

            if(response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                });
                setImage(false);

                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data.message);
            console.log(error.response?.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={((e) => setImage(e.target.files[0]))} type="file" id='image' hidden required/>
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleInputChange} type="text" value={data.name} name='name' placeholder='Type here' required/>
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleInputChange} name="description" value={data.description} rows="4" placeholder='Write content here' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleInputChange} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleInputChange} type="Number" value={data.price} name='price' placeholder='&#8377; 99' min="1" required/>
                    </div>
                </div>

                <button type='submit' className='add-btn' disabled={loading}>{loading ? "Adding..." : "Add"}</button>
            </form>
        </div>
    )
}