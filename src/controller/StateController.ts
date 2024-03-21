import AppDataSource from "../datasource/dataSource";
import { State } from "../entities/State.entity";

let stateRepository = AppDataSource.getRepository(State);

export class StateController {
  // GET STATEWISE LOCATION
  public async getLocation(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const locationData = await stateRepository.findOneBy({
        id: id,
      });

      if (locationData) {
        return res.status(200).json({
          message: "Location Get Successfully.",
          data: locationData,
        });
      } else {
        return res.status(400).json({
          message: "Location Not Exist.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error.",
        error: error,
      });
    }
  }
}
