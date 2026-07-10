import Food from "../models/foodModel.js";

// add food
const addFood = async (req, res) => {
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url, filename);

        const newFood = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        });

        newFood.image = {url, filename};


    try{
        await newFood.save();
        res.json({success: true, message: "Food Added"});
    } catch(err){
        console.error(err);
        console.error(err.message);
        console.error(err.stack);
        res.json({success: false, message: err.message});
    }

    // try {
    //     console.log("=========== BODY ===========");
    //     console.log(req.body);

    //     console.log("=========== FILE ===========");
    //     console.dir(req.file, { depth: null });

    //     const newFood = new Food({
    //         name: req.body.name,
    //         description: req.body.description,
    //         price: req.body.price,
    //         category: req.body.category,
    //         image: {
    //             url: req.file.path,
    //             filename: req.file.filename,
    //         },
    //     });

    //     console.log("=========== BEFORE SAVE ===========");

    //     await newFood.save();

    //     console.log("=========== SAVED ===========");

    //     return res.json({
    //         success: true,
    //         message: "Food Added",
    //     });

    // } catch (err) {
    //     console.log("=========== ERROR ===========");
    //     console.error(err);
    //     console.error(err.message);
    //     console.error(err.stack);

    //     return res.status(500).json({
    //         success: false,
    //         message: err.message,
    //     });
    // }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({success: true, data: foods});
    } catch(err){
        res.json({success: false, message: "Error"});
    }
}

//remove food item
const removeFood = async(req, res) => {
    try {
        let {id} = req.body;
        let food = await Food.findByIdAndDelete(id);
        console.log(food);
        res.json({success: true, message: "Food removed successfully"});
    } catch (error) {
        res.json({success: false, message: "Error"});
    }
}

export {addFood, listFood, removeFood};