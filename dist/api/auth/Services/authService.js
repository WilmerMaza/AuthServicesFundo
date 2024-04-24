"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.loginHall = exports.createHall = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidEnvironment_1 = require("../../../config/ValidEnvironment");
const HallModel_1 = __importDefault(require("../../../models/HallModel"));
const createHall = async (request) => {
    const codeHall = generateRandomCode(6);
    const hall = new HallModel_1.default({
        codeHall,
        ...request,
    });
    try {
        await hall.save();
    }
    catch (error) {
        throw error;
    }
    return codeHall;
};
exports.createHall = createHall;
const loginHall = async ({ hall, platform, documento, }) => {
    const resposeHall = await findHall(hall);
    if (resposeHall === null)
        throw "Not authorized or Hall does not exist";
    return await switchPlatform(platform, documento, resposeHall);
};
exports.loginHall = loginHall;
async function switchPlatform(platform, documento, resposeHall) {
    var auth = false;
    switch (platform) {
        case "chronometer":
            if (documento) {
                auth = await validPerson(documento, platform, resposeHall);
            }
            break;
        case "Board":
            break;
        case "mobile":
            break;
        case "RegistrationPlatform":
            break;
        default:
            break;
    }
    return auth;
}
async function validPerson(document, platform, data) {
    const platformData = data[platform];
    return Array.isArray(platformData)
        ? platformData.some((person) => person.document === document && !person.isActive)
        : platformData.document === document && !platformData.isActive;
}
const findHall = (codeHall) => {
    return HallModel_1.default.findOne({ codeHall }).exec();
};
function generateRandomCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const generateJWT = ({ hall, platform, documento, }) => {
    return jsonwebtoken_1.default.sign({ hall, username: documento, platform }, ValidEnvironment_1.JWT_SECRET, {
        expiresIn: ValidEnvironment_1.timeJWT,
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=authService.js.map