import dotenv from "dotenv";
dotenv.config();

function getEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw Error(`${name} must be set.`);
  }
  return value;
}

export const JWT_SECRET = getEnvironmentVariable("JWT_SECRET");
export const urlMongoDBN = getEnvironmentVariable("urlMongoDBN");
export const PORT = getEnvironmentVariable("PORT");
export const timeJWT = getEnvironmentVariable("timeJWT");
