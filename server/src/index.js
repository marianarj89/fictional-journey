import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";

const app = express();	

dotenv.config(); 


const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbUser = process.env.MONGODB_USER;
const mongodbUri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0.49q2peh.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0`;


app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);

mongoose
  .connect(mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
  console.log(mongodbUri, mongodbUser, mongodbPassword)
  

// mongoose
//     .connect("mongodb+srv://marianarj89:tjKUs4Xnirc3q4Vc@cluster0.49q2peh.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => console.log("Conectado ao MongoDB"))
//     .catch((err) => console.log("Erro ao conectar ao MongoDB", err));

app.listen(3001, () => console.log("SERVIDOR RODANDO NA PORTA: 3001"));