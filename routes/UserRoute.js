import express from "express"
import { getUsers,
         getUserById,
         createUser
} from "../controller/Usercontroller.js"

const router = express.Router();

router.get('/api/users', getUsers);
router.get('/api/users:id', getUserById)
router.post('/api/users', createUser)

export default router