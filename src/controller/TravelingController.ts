import AppDataSource from "../datasource/dataSource";
import { Traveling } from "../entities/Traveling.entity";

let travelingRepository = AppDataSource.getRepository(Traveling);

export class TravelingController {
  // GET TRAVELING LIST
  public async getTravelingList(req: any, res: any) {
    try {
      const getData = await travelingRepository.find();

      return res.status(200).json({
        message: "Traveling List Get Successfully.",
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

  // INSERT A NEW TRAVELING
  public async addTraveling(req: any, res: any) {
    const travelingDetails = req?.body;
    try {
      const existingTraveling = await AppDataSource.getRepository(
        Traveling
      ).findOne({
        where: { title: travelingDetails?.title },
      });

      if (existingTraveling) {
        return res.status(409).json({
          message: "Traveling Already Exist.",
        });
      }

      const file = req?.file;
      const travelingDataInsert = new Traveling();

      travelingDataInsert["title"] = travelingDetails["title"];
      travelingDataInsert["description"] = travelingDetails["description"];
      travelingDataInsert["image"] = file?.filename || null;
      travelingDataInsert["totalDays"] = travelingDetails["totalDays"];
      travelingDataInsert["pricePerDay"] = travelingDetails["pricePerDay"];

      const travelingInsertDataSource = await travelingRepository.save(
        travelingDataInsert
      );
      return res.status(200).json({
        message: "Traveling Created Successfully.",
        data: travelingInsertDataSource,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Traveling Not Create.",
        error: error,
      });
    }
  }

  // UPDATE TRAVELING
  public async updateTraveling(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const travelingUpdate = req?.body;
      const travelingFetch = await travelingRepository.findOneBy({
        id: id,
      });
      const file = req?.file;

      if (travelingFetch) {
         travelingFetch["title"] = travelingUpdate["title"] || travelingFetch["title"];
         travelingFetch["description"] = travelingUpdate["description"] || travelingFetch["description"];
         travelingFetch["image"] = file?.filename || travelingFetch["image"];
         travelingFetch["totalDays"] = travelingUpdate["totalDays"] || travelingFetch["totalDays"];
         travelingFetch["pricePerDay"] = travelingUpdate["pricePerDay"] || travelingFetch["pricePerDay"];

        let travelingFetchData = await travelingRepository.save(travelingFetch);
        return res.status(200).json({
          message: "Traveling Updated Successfully.",
          data: travelingFetchData,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Traveling Not Update.",
      });
    }
  }

  // DELETE TRAVELING
  public async deleteTraveling(req: any, res: any) {
    try {
      const id = parseInt(req?.params.id);
      const deleteTraveling = await travelingRepository.delete(id);
      //console.log(id);
      return res.status(200).json({
        message: "Traveling Deleted Successfully.",
        data: deleteTraveling,
      });
    } catch (error) {
      return res.status(400).json({ message: "Traveling Not Delete.", error });
    }
  }

  // GET SPECIFIC TRAVELING
  public async getTraveling(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const travelingData = await travelingRepository.findOneBy({
        id: id,
      });

      if(travelingData){
        return res.status(200).json({
          message: "Traveling Get Successfully.",
          data: travelingData,
        });
      }
      else
      {
        return res.status(400).json({
          message: "Traveling Not Exist."
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
