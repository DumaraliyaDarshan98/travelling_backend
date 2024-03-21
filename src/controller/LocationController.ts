import AppDataSource from "../datasource/dataSource";
import { Location } from "../entities/Location.entity";

let locationRepository = AppDataSource.getRepository(Location);

export class LocationController {
  // GET LOCATION LIST
  public async getLocationList(req: any, res: any) {
    try {
      const getData = await locationRepository.find();

      return res.status(200).json({
        message: "Location List Get Successfully.",
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

  // INSERT A NEW LOCATION
  public async addLocation(req: any, res: any) {
    const locationDetails = req?.body;
    //console.log('asdasdasd', req?.file);
    try {
      const existingLocation = await AppDataSource.getRepository(
        Location
      ).findOne({
        where: { title: locationDetails?.title },
      });

      console.log("existingLocation", existingLocation);
      //console.log(req?.files);
      if (existingLocation) {
        return res.status(409).json({
          message: "Location Already Exist.",
        });
      }

      const locationDataInsert = new Location();
      // Get uploaded file information
      const file = req?.file;

      locationDataInsert["title"] = locationDetails["title"];
      locationDataInsert["description"] = locationDetails["description"];
      locationDataInsert["image"] = file?.filename || null;
      locationDataInsert["stateId"] = locationDetails["stateId"];
      locationDataInsert["cityId"] = locationDetails["cityId"];

      const locationInsertDataSource = await locationRepository.save(
        locationDataInsert
      );
      return res.status(200).json({
        message: "Location Created Successfully.",
        data: locationInsertDataSource,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Location Not Create.",
        error: error,
      });
    }
  }

  // UPDATE LOCATION
  public async updateLocation(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const locationUpdate = req?.body;
      const locationFetch = await locationRepository.findOneBy({
        id: id,
      });
      // Get uploaded file information
      const file = req?.file;

      if (locationFetch) {
        locationFetch["title"] =
          locationUpdate["title"] || locationFetch["title"];
        locationFetch["description"] =
          locationUpdate["description"] || locationFetch["description"];
        locationFetch["image"] = file?.filename || locationFetch["image"];
        locationFetch["stateId"] =
          locationUpdate["stateId"] || locationFetch["stateId"];
        locationFetch["cityId"] =
          locationUpdate["cityId"] || locationFetch["cityId"];

        let locationFetchData = await locationRepository.save(locationFetch);
        return res.status(200).json({
          message: "Location Updated Successfully.",
          data: locationFetchData,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Location Not Update.",
      });
    }
  }

  // DELETE LOCATION
  public async deleteLocation(req: any, res: any) {
    try {
      const id = parseInt(req?.params.id);
      const deleteLocation = await locationRepository.delete(id);
      //console.log(id);
      return res.status(200).json({
        message: "Location Deleted Successfully.",
        data: deleteLocation,
      });
    } catch (error) {
      return res.status(400).json({ message: "Location Not Delete.", error });
    }
  }

  // GET SPECIFIC LOCATION
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
