import mongoose, { Document, Schema } from "mongoose";

export interface IPerson extends Document {
  name: string;
  document: string;
  isActive: boolean;
}

export interface IHall extends Document {
  codeHall: string;
  RegistrationPlatform: IPerson;
  mobile: IPerson[];
  chronometer: IPerson;
}

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  document: { type: String, required: true },
  isActive: { type: Boolean, default: false },
});

const HallSchema: Schema = new Schema({
  codeHall: { type: String, required: true },
  RegistrationPlatform: { type: PersonSchema, required: true },
  mobile: { type: [PersonSchema], required: true },
  chronometer: { type: PersonSchema, required: true },
});

const Hall = mongoose.model<IHall>("Hall", HallSchema);

export default Hall;
