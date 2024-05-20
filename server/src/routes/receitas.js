import express from "express";
import mongoose from "mongoose";
import { ReceitasModel } from "../models/Receitas.js";
import UserModel from "../models/Users.js";



const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ReceitasModel.find({});
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const receita = new ReceitasModel(req.body);
  try {
    const response = await receita.save();
    res.json(receita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const receita = await ReceitasModel.findById(req.body._id);
    const user = await UserModel.findById(req.body.userID);
    user.receitasSalvas.push(receita._id);
    await user.save();
    res.json({ receitasSalvas: user.receitasSalvas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("receitasSalvas/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ receitasSalvas: user?.receitasSalvas });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/receitasSalvas", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const receitasSalvas = await ReceitasModel.find({ _id: { $in: user.receitasSalvas } });
    res.json({receitasSalvas});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
export { router as receitasRouter };
