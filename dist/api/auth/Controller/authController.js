"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const RequestHallLogin_1 = require("../../../interface/RequestHallLogin");
const authService_1 = require("../Services/authService");
const register = async (req, res) => {
    try {
        var ResposeHallCode = await (0, authService_1.createHall)(req.body);
        res
            .status(201)
            .json({ message: `Hall registered successfully: ${ResposeHallCode}` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { error, value } = RequestHallLogin_1.SchemaRequestHall.validate(req.body);
    if (error) {
        res.status(400).json({ message: "Bad request", details: error.details });
        return;
    }
    try {
        if (await (0, authService_1.loginHall)(value)) {
            const token = (0, authService_1.generateJWT)(value);
            res.json({ message: "Login successful", token });
        }
        else {
            res.status(401).json({ message: "Invalid" });
        }
    }
    catch (error) {
        // Mejorar el manejo de errores con un tipo más específico
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map