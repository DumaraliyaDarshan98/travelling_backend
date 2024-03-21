import { DataSource } from "typeorm";
import { Users } from "../entities/Users.entity";
import { Traveling } from "../entities/Traveling.entity";
import { Location } from "../entities/Location.entity";
import { State } from "../entities/State.entity";
import { City } from "../entities/City.entity";


const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "travelling",
  synchronize: true,
  logging: true,
  entities: [Users, Traveling, Location, State, City],
});

export default AppDataSource;