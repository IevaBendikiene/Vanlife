import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Defining the van schema
const vanSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user_id: {
    type:  String,
    required:true
  }
});

export default mongoose.model("Van", vanSchema);
