import AppDataSource from "../datasource/dataSource";
import { Location } from "../entities/Location.entity";

let locationRepository = AppDataSource.getRepository(Location);

export class LocationController {
  // GET SPECIFIC TRAVELING
  public async getLocation(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const locationData = await locationRepository.findOneBy({
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
