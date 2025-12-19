import jwt from "jsonwebtoken";

import User from "../Models/User.js";
import { reglimiter } from "../Config/upstash.js";

export async function newUser(req, res) {
  try {
    const { Name, Email, Password } = req.body;
    const userExists = await User.findOne({ Email });
    if (!Name.trim() || !Email.trim() || !Password.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      const { success, reset } = await RegistrationLimit(req, res);
      if (!success) {
        return res.status(429).json({
          message: "too many account creation attempts",
          resetsAt: new Date(reset).toISOString(),
        });
      }
      const NewAccount = await User.create({ Name, Email, Password });
      const token = genToken(NewAccount._id);

      res.status(201).json({
        id: NewAccount._id,
        Name: NewAccount.Name,
        Email: NewAccount.Email,
        token,
      });
    }
  } catch (error) {
    console.error("Error in newUser controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signIn(req, res) {
  try {
    const { Email, Password } = req.body;
    const LoadAcc = await User.findOne({ Email });
    if (!Email.trim() || !Password.trim()) {
      return res.status(400).json({ mesage: "All fields are required" });
    } else if (!LoadAcc) {
      return res.status(401).json({ message: "This account doesn't exist" });
    } else if (!(await LoadAcc.matchPass(Password))) {
      return res.status(401).json({ message: "Wrong Password" });
    } else {
      const token = genToken(LoadAcc._id);
      return res.status(200).json({
        id: LoadAcc._id,
        Name: LoadAcc.Name,
        Email: LoadAcc.Email,
        token,
      });
    }
  } catch (error) {
    console.error("Error in signIn controller"); //removed
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function currUser(req, res) {
  res.set("Cache-Control", "no-store");
  res.status(200).json(req.user);
}

export function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

async function RegistrationLimit(req, res) {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.headers["x-real-ip"] ||
      req.socket.remoteAddress;
    const identifier = `regIdentifier:${ip}`;
    const { success, limit, remaining, reset } = await reglimiter.limit(
      identifier
    );
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });

    return { success, reset };
  } catch (error) {
    console.error(`Error in registrationLimit helper function ${error}`);
  }
}
