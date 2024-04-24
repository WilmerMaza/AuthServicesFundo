"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("./Controller/authController");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/register', authController_1.register);
authRoutes.post('/login', authController_1.login);
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map