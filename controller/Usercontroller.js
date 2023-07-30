import User from "../models/Usermodel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(
            {"message":'success',"data":response}
        )
    } catch (error) {
        res.status(500).json(
            {'message': 'Internal Server Error'}
        )
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(
            {"message":"Success","userDetails":{...response}}
        )
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send(
            {'message': 'Internal Server Error',
                'error' : error
            }
        )
    }
}

export const createUser = async(req, res) => {
    // console.log(req.body)
    const {name, email, password} = req.body;
    try {
        await User.create({
            name: name,
            email: email,
            password: password,
        });
        res.status(201).json({"message" :"Created successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(400).json(
            {'message':'Failed to Create user','errors':[error]}
        )
    }
}