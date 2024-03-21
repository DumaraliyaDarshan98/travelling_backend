import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from './Location.entity';

@Entity("traveling")
export class Traveling {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200, name: "title" })
  title!: string;

  @Column({ type: "varchar", length: 600, name: "description" })
  description!: string;

  @Column({ type: "varchar", length: 800, name: "image", default: null })
  image!: string;

  @Column({ type: "int", name: "totalDays" })
  totalDays!: number;

  @Column({ type: "int", name: "pricePerDay" })
  pricePerDay!: number;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  createdAt!: Date;

  @ManyToOne(() => Location, (location) => location.Traveling)
  @JoinColumn({ name: "location_id" })
  location!: Location;
}
