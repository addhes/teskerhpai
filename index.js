import express from "express"
import cors from "cors"
import UserRoute from "./routes/UserRoute.js"

const app = express();
app.use(cors()); // enable CORS for all requests
app.use(express.json());
app.use(UserRoute); 

app.listen(5000, ()=> console.log('server connected'));