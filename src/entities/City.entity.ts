import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { State } from "./State.entity";
import { Location } from "./Location.entity";

@Entity("city")
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200, name: "cityName" })
  cityName!: string;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  createdAt!: Date;

  @ManyToOne(() => State, (state) => state.City)
  @JoinColumn({ name: "state_id" })
  state!: State;

  @OneToMany(() => Location, (location) => location.cityId)
  Location!: Location[];
}

