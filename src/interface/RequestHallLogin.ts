import Joi from "joi";

export interface RequestHallLogin {
  documento?: string;
  hall: string;
  platform:string;
}

export const SchemaRequestHall = Joi.object({
    hall: Joi.string().required(),
    platform: Joi.string().required(),
    documento: Joi.string(),
  });