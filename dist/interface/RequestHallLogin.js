"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaRequestHall = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SchemaRequestHall = joi_1.default.object({
    hall: joi_1.default.string().required(),
    platform: joi_1.default.string().required(),
    documento: joi_1.default.string(),
});
//# sourceMappingURL=RequestHallLogin.js.map