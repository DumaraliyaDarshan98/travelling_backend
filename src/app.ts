import express from "express";
import AppDataSource from "./datasource/dataSource";
import cors from "cors";
import mainRoute from "./routes/mainRoute";

const PORT = process.env.PORT || 3200;

AppDataSource.initialize().then(() => {
    console.log("Data source initialized");
})
.catch((error) => {
    console.log("Data source not initialized", error);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("", mainRoute);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});