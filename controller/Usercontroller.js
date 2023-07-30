import User from "../models/Usermodel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
            {"message":"Success","userDetails": response}
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
    const salt = await bcrypt.genSalt();
    const hashpwd = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashpwd,
        });
        res.status(201).json({"message" :"Created successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(400).json(
            {'message':'Failed to Create user','errors':[error]}
        )
    }
}

export const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) {
        return res.status(404).json({"msg": "user tidak ditemukan"});
    }

    try {
        await User.destroy({
            where:{
                id: req.params.id
            },
        });
        res.status(200).json({"msg": "User Berhasil dihapus"}); 
    } catch (error) {
        res.status(400).json({"msg": error.message})
    }

}

export const login = async(req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({"msg": "password salah"});
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role
        const accessToken = jwt.sign({name, email, role}, process.env.ACCESS_TOKEN_SECRET,)
        res.cookie('accesToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken})
    } catch (error) {
        res.status(404).json({
            "msg" : "Email tidak ditemukan"
        })
    }
}