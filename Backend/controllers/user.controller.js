import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  // Validar que todos los campos estén presentes
  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.create({
      email,
      password: bcrypt.hashSync(password, 10), // Encriptar la contraseña
      rol,
      lenguage,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOneEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creación del payload
    const payload = {
      email,
      user_id: user.id, // Corregido para usar "id" en lugar de "user_id"
    };

    // Creación del token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login successfully",
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findOneEmail(req.user.email); // Usa el email del token para buscar el usuario
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      rol: user.rol,
      lenguage: user.lenguage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userController = {
  login,
  register,
  getUser, // Agregar este controlador
};
