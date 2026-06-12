import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express()
const __dirname = path.resolve()
const PORT = Number(process.env.PORT)
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/dist")))
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  })
}
server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));