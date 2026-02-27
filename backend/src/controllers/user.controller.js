import User from "../models/user.models.js"



const getCurrectUser = async (req, res) => {
  try {
    const user = req.user;   // coming from middleware

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get current user ${error}` });
  }
};

export default getCurrectUser