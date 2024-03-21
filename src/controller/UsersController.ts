import { Users } from "../entities/Users.entity";
import AppDataSource from "../datasource/dataSource";
import { generateHashPassword } from "../core/generateHashPassword";

let userRepository = AppDataSource.getRepository(Users);

export class UserController {
  // GET USER LIST
  public async getUserList(req: any, res: any) {
    try {
      const getData = await userRepository.find();

      return res.status(200).json({
        message: "Users List Get Successfully.",
        data: getData,
        pagination: {
          page: req?.query?.page,
          limit: req?.query?.limit,
          totalRecords: getData?.length,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error.",
        error: error,
      });
    }
  }

  // INSERT A NEW USER
  public async addUser(req: any, res: any) {
    const userDetails = req?.body;
    try {
      const existingEmail = await AppDataSource.getRepository(Users).findOne({
        where: { email: userDetails["email"] },
      });

      if (existingEmail) {
        return res.status(409).json({
          message: "User Already Exist.",
        });
      }

      // Implement password hash functionality using the crypto module
      // const cryptoPassword = generateHashPassword(req?.body?.password);
      // req.body.password = cryptoPassword;

      const userDataInsert = new Users();
      userDataInsert.firstName = userDetails["firstName"];
      userDataInsert.lastName = userDetails["lastName"];
      userDataInsert.mobileNo = userDetails["mobileNo"];
      userDataInsert.email = userDetails["email"];
      userDataInsert.password = userDetails["password"];

      const userInsertDataSource = await AppDataSource.getRepository(Users).save(userDataInsert);

      return res.status(200).json({
        message: "User Created Successfully.",
        data: userInsertDataSource,
      });
    } catch (error) {
      return res.status(400).json({
        message: "User Not Create.",
        error: error,
      });
    }
  }

  // UPDATE PROFILE OF USER
  public async updateUserProfile(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const userUpdate = req?.body;
      const userFetch = await userRepository.findOneBy({
        id: id,
      });

      if (userFetch) {
        userFetch.firstName = userUpdate["firstName"];
        userFetch.lastName = userUpdate["lastName"];
        userFetch.mobileNo = userUpdate["mobileNo"];
        userFetch.email = userUpdate["email"];
        userFetch.password = userUpdate["password"];

        let userFetchData = await userRepository.save(userFetch);
        return res.status(400).json({
          message: "User Profile Updated Successfully.",
          data: userFetchData,
        });
      }
    } catch (error) {
      return res.status(200).json({
        message: "User Profile Not Update.",
      });
    }
  }

  // DELETE A USER PROFILE
  public async deleteUserProfile(req: any, res: any) {
    try {
      const id = parseInt(req?.params.id);
      const user = await userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        return res.status(400).json({
          message: "User Not Found.",
        });
      }
      const deleteData = await userRepository.delete(id);
      return res.status(200).json({
        message: "User Profile Deleted Successfully.",
        data: deleteData,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "User Profile Not Delete.", error });
    }
  }
}
