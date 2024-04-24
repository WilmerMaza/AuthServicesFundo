import { Request, Response } from "express";
import { SchemaRequestHall } from "../../../interface/RequestHallLogin";
import { createHall, generateJWT, loginHall } from "../Services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    var ResposeHallCode = await createHall(req.body);
    res
      .status(201)
      .json({ message: `Hall registered successfully: ${ResposeHallCode}` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = SchemaRequestHall.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Bad request", details: error.details });
    return;
  }

  try {
    if (await loginHall(value)) {
      const token = generateJWT(value);

      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid" });
    }
  } catch (error) {
    // Mejorar el manejo de errores con un tipo más específico
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
