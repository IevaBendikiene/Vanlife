import mongoose from 'mongoose';
import Van from '../models/vanModel.js'
 
const host = 123

//Get vans that belong to the same host
export const getHostsVans = async (req, res) => {
    const user_id = req.user._id 
   try{
    const hostVans = await Van.find({user_id})
    res.status(200).json(hostVans)
   } catch (err) {
    return res.status(500).send("Server error")
   }
}

//Get one van that belong to the host
export const getHostVan = async (req, res) => {
    const { id } = req.params 

    // Check if the provided ID is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "There is no such van" })
    };
    try {
        const hostVan = await Van.findById(id)
        if (!hostVan) {
            return res.status(404).json({error: "There is no such van"})
        }
        res.status(200).json(hostVan)
    } catch (err) {
        return res.status(500).send("Server error")
    }
}

//POST create new van for host
export const createHostVan = async (req, res) => {
    const { name, price,
        description,
        imageUrl,
        type} = req.body 
        try {
            const user_id = req.user._id
            const van = await Van.create({ name, price, description, imageUrl, type, user_id})
            res.status(200).json(van)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
}

//PATCH update host van
export const updateHostVan = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such van"})
    }
    const van = await Van.findOneAndUpdate({_id: id}, {...req.body})
    if(!van) {
        return res.status(404).json({error: "There is no such van"})
    }
    res.status(200).json(van)
}

//DELETE one host van
export const deleteHostVan = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such van"})
    }
    const van = await Van.findOneAndDelete({_id: id})
    if(!van) {
        return res.status(404).json({error: "There is no such van"})
    }
    res.status(200).json(van)
}