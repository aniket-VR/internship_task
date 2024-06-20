import mongoose, { Types } from "mongoose";

export const transcationSchema = mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  sold: {
    type: Boolean,
  },
  dateOfSale: {
    type: String,
  },
});
