import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City.entity";
import { Location } from "./Location.entity";

@Entity("state")
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200, name: "stateName" })
  stateName!: string;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  createdAt!: Date;

  @OneToMany(() => City, (city) => city.state)
  City!: City[];

  @OneToMany(() => Location, (location) => location.stateId)
  Location!: Location[];
}
