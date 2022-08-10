import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/User";

dbConnect();
export default async function handler(req, res) {
  const { body, method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await User.find();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newUser = new User(body);
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(500).json({ msg: "The method is not supported" });
  }
}
