import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email already exists'
        },
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[6] //password length should be at least 8 characters long and maximum of
        }
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue:"user",
    }
}, {
    freezeTableName: true,
});

export default User;

// (async()=> {
//     await db.sync();
// })();