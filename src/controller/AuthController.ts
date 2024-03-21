import { Console } from "console";
import { matchPassword } from "../core/generateHashPassword";
import AppDataSource from "../datasource/dataSource";
import { Users } from "../entities/Users.entity";
import jwt from "jsonwebtoken";

export class AuthController {
  // IMPLEMENT LOGIN USER FUNCTIONALITY
  public async login(req: any, res: any) {
    const { email, password } = req?.body;
    try {
      const user: any = await AppDataSource.getRepository(Users).findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(401).json({
          message: "User Not Found.",
        });
      }

      // COMPARE PASSWORD WITH HASH PASSWORD
      const passwordMatch = await matchPassword(user?.password, password);

      if (user?.password !== password) {
        return res.status(401).json({
          message: "Wrong Password.",
        });
      }

      return res.status(200).json({
        message: "User Login.",
        role: user?.role,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error.",
      });
    }
  }
}
