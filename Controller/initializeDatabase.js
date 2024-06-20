import axios from "axios";
import { TranscationModel } from "../Database/model/transcation.js";
import { transcationSchema } from "../Database/schema/transcation.js";

export async function initializeDB(req, res) {
  const transcation = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  try {
    if (transcation) {
      const result = TranscationModel.insertMany(transcation.data);
      if (result) {
        res.send("success");
      } else {
        res.send("failed");
      }
    }
  } catch (error) {
    res.send("error");
  }
}
