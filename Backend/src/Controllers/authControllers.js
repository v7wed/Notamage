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
        _id: NewAccount._id,
        Name: NewAccount.Name,
        Email: NewAccount.Email,
        token,
      });
    }
  } catch (error) {
    console.error(`Error in newUser controller ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signIn(req, res) {
  try {
    const { Email, Password } = req.body;
    const LoadAcc = await User.findOne({ Email });
    if (!Email.trim() || !Password.trim()) {
      return res.status(400).json({ name: "EmptyFields", mesage: "All fields are required" });
    } else if (!LoadAcc) {
      return res.status(404).json({ name: "NotFound", message: "No such account exists" });
    } else if (!(await LoadAcc.matchPass(Password))) {
      return res.status(401).json({ name: "WrongPassword", message: "Wrong Password" });
    } else {
      const token = genToken(LoadAcc._id);
      return res.status(200).json({
        _id: LoadAcc._id,
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

export async function updateEmail(req, res) {
  try {
    const { Email } = req.body;
    const user = await User.findById(req.user._id);

    if (!Email?.trim()) {
      return res.status(400).json({ message: "New Email is required" });
    }

    const userExists = await User.findOne({ Email });
    if (userExists) {
      return res.status(409).json({ message: "Email already in use" });
    }

    user.Email = Email;
    await user.save();

    res.status(200).json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
    });
  } catch (error) {
    console.error("Error in updateEmail controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    const isMatch = await user.matchPass(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    user.Password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in updatePassword controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteAccount(req, res) {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(result);
  } catch (error) {
    console.error("error in deleteAccount controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

async function RegistrationLimit(req, res) {
  // rate limits to be skipped in testing enviroments
  if (process.env.NODE_ENV === 'test') {
    return { success: true, reset: Date.now() };
  }

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

