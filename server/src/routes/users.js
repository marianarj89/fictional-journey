import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";
import dotenv from "dotenv";

const loginSecret = process.env.LOGIN_SECRET;

const router = express.Router();

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
  const { username, email, password } = req.body;
  const usuario = await UserModel.findOne({ username });

  if (!usuario) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, usuario.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  const token = jwt.sign({ id: usuario._id }, loginSecret);
  res.json({ token, userID: usuario._id });
});

export { router as usersRouter };
