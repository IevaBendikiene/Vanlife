import Van from "../models/vanModel.js";
import mongoose from "mongoose";

//GET all vans
export const getVans = async (req, res) => {
  const vans = await Van.find({});
  res.status(200).json(vans);
};

//GET one van
export const getVan = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "There is no such van." });
  }
  const van = await Van.findById(id);
  if (!van) {
    return res.status(404).json({ error: "There is no such van." });
  }
  res.status(200).json(van);
};

//POST create new van
export const createVan = async (req, res) => {
  const { name, price, description, imageUrl, type, host_id } = req.body;
  try {
    const van = await Van.create({
      name,
      price,
      description,
      imageUrl,
      type,
      host_id,
    });
    res.status(200).json(van);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//PATCH update van
export const updateVan = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "There is no such van" });
  }
  const van = await Van.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!van) {
    return res.status(404).json({ error: "There is no such van" });
  }
  res.status(200).json(van);
};

//DELETE one van
export const deleteVan = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "There is no such van" });
  }
  const van = await Van.findOneAndDelete({ _id: id });
  if (!van) {
    return res.status(404).json({ error: "There is no such van" });
  }
  res.status(200).json(van);
};
