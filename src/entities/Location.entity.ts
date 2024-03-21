import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Traveling } from "./Traveling.entity";
import { State } from "./State.entity";
import { City } from "./City.entity";

@Entity("location")
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200, name: "title" })
  title!: string;

  @Column({ type: "varchar", length: 600, name: "description" })
  description!: string;

  @Column({ type: "varchar", length: 800, name: "image", default: null })
  image!: string;

  // @Column({ type: "varchar", length: 100, name: "state" })
  // state!: string;

  // @Column({ type: "varchar", length: 100, name: "city" })
  // city!: string;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  createdAt!: Date;

  @OneToMany(() => Traveling, (traveling) => traveling.location)
  Traveling!: Traveling[];

  @ManyToOne(() => State, (state) => state.Location)
  @JoinColumn({ name: "state_id" })
  stateId!: State;

  @ManyToOne(() => City, (city) => city.Location)
  @JoinColumn({ name: "city_id" })
  cityId!: City;
}