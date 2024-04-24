import { UserEntity } from "./User";

export interface HallRequest {
  RegistrationPlatform: UserEntity;
  mobile: MovilJuez;
  chronometer: UserEntity;
}

interface MovilJuez {
  jueces: Array<UserEntity>;
}
