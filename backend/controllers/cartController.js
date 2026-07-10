import User from '../models/userModel.js'

// add to cart
const addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item added to cart"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// fetch cart data of user
const getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export {addToCart, removeFromCart, getCart};