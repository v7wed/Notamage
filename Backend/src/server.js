import app from "./app.js"
import connectDB from "./Config/db.js";

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on port", PORT);
  });
});
