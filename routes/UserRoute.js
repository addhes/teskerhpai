import express from "express"
import { getUsers,
         getUserById,
         createUser,
         deleteUser,
         login
} from "../controller/Usercontroller.js"

const router = express.Router();

router.get('/api/users', getUsers);
router.get('/api/users/:id', getUserById)
router.post('/api/users', createUser)
router.delete('/api/users/:id', deleteUser)
router.post('/api/login', login);

export default router