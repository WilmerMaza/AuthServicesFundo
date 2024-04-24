import jwt from "jsonwebtoken";
import { JWT_SECRET, timeJWT } from "../../../config/ValidEnvironment";
import { HallRequest } from "../../../interface/RequestHall";
import { RequestHallLogin } from "../../../interface/RequestHallLogin";
import Hall, { IHall, IPerson } from "../../../models/HallModel";

export const createHall = async (request: HallRequest): Promise<string> => {
  const codeHall = generateRandomCode(6);

  const hall = new Hall({
    codeHall,
    ...request,
  });

  try {
    await hall.save();
  } catch (error) {
    throw error;
  }

  return codeHall;
};

export const loginHall = async ({
  hall,
  platform,
  documento,
}: RequestHallLogin): Promise<boolean> => {
  const resposeHall = await findHall(hall);

  if (resposeHall === null) throw "Not authorized or Hall does not exist";

  return await switchPlatform(platform, documento, resposeHall);
};

async function switchPlatform(
  platform: string,
  documento: string | undefined,
  resposeHall: IHall
): Promise<boolean> {
  var auth: boolean = false;

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

async function validPerson(
  document: string,
  platform: keyof IHall,
  data: IHall
): Promise<boolean> {
  const platformData = data[platform];

  return Array.isArray(platformData)
    ? platformData.some(
        (person: IPerson) => person.document === document && !person.isActive
      )
    : platformData.document === document && !platformData.isActive;
}

const findHall = (codeHall: string): Promise<IHall | null> => {
  return Hall.findOne({ codeHall }).exec();
};

function generateRandomCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const generateJWT = ({
  hall,
  platform,
  documento,
}: RequestHallLogin): String => {
  return jwt.sign({ hall, username: documento, platform }, JWT_SECRET, {
    expiresIn: timeJWT,
  });
};
