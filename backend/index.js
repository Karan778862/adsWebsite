
import express from "express"
import cors from "cors"
import dotenv, { config } from "dotenv"
import monogoDB from "./db/dbs.js";
import adsRouter from "./routes/adsRoutes.js"
import { fileURLToPath } from 'url';
import path from "path"

dotenv.config({})

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _dirname = path.resolve();

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const corsOptions = {
    origin:'https://desiads.onrender.com/',
    credentials:true
};
app.use(cors(corsOptions));


app.use("/api",adsRouter)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    monogoDB();
    console.log(`Server running on port ${PORT}`)})

