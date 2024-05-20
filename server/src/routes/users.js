import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const loginSecret = process.env.LOGIN_SECRET;

const router = express.Router();

const logToFile = (message) => {
  const logFilePath = path.join(__dirname, "userActivity.log");
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Ocorreu um erro ao gravar o log:", err);
    }
  });
};


//http://localhost:3001/auth/cadastro POST

//ROTA CADASTRO

router.post("/cadastro", async (req, res) => {
  const { username, email, password } = req.body; //get data from frontend
  const usuario = await UserModel.findOne({ username }); //look for on database

  if (usuario) {
    return res.status(400).json({ message: "Usuário já existe" }); //return if already exists
  }

  const hashPassword = await bcrypt.hash(password, 10); //hash password

  const newUsuario = new UserModel({ username, email, password: hashPassword }); //create new user
  await newUsuario.save(); //ctreate user on database

  res.json({ message: "Usuário criado com sucesso" });
});


//ROTA LOGIN

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "usuário ou senha incorretos" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "usuário ou senha incorretos" });
  }
  const token = jwt.sign({ id: user._id }, loginSecret);
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, loginSecret, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as usersRouter };
