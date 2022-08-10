import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: "Cannot find the User" });
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ msg: "invalid id" });
      }

    case "PUT":
      try {
        const Updateduser = await User.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!Updateduser) {
          return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(Updateduser);
      } catch (error) {
        return res.status(500).json({ msg: "invalid id" });
      }

    case "DELETE":
      try {
        const Deleteduser = await User.findByIdAndDelete(id);
        if (!Deleteduser) {
          return res.status(404).json({ msg: "User not found" });
        }
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ msg: "invalid id" });
      }
    default:
      return res.status(500).json({ msg: "The method is not supported" });
  }
};
