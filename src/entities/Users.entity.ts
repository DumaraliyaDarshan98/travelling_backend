import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 400, name: "firstName" })
  firstName!: string;

  @Column({ type: "varchar", length: 400, name: "lastName" })

  lastName!: string;

  @Column({ type: "varchar", length: 14, name: "mobileNo" })
  mobileNo!: string;

  @Column({ type: "varchar", length: 600, name: "email" })
  email!: string;

  @Column({ type: "varchar", length: 100, name: "password" })
  password!: string;

  @Column({ type: "int", default: 0, name: "role", comment: "1: Admin 0: User" })
  role!: number;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  createdAt!: Date;
}
