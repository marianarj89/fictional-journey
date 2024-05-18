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


app.listen(3001, () => console.log("SERVIDOR RODANDO NA PORTA: 3001"));