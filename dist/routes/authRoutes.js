"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("../api/auth/authRoutes"));
const router = (0, express_1.Router)();
router.use('/api/auth', authRoutes_1.default);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map