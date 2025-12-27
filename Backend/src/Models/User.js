import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Userschema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

Userschema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

Userschema.methods.matchPass = async function (input_pass) {
  return await bcrypt.compare(input_pass, this.Password);
};
const User = mongoose.model("User", Userschema);

export default User;
