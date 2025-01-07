import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoute); // Montar rutas de usuario bajo el prefijo "/users"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
