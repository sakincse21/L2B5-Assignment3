import express, { Application, Request, Response } from "express";
import cors from 'cors';
import apiRoutes from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to Sakin's Library")
})

app.use((req:Request,res:Response)=>{
  res.status(404).json('Webpage does not exist')
})

app.use((error: Error, req: Request, res: Response) => {
  if (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong from global error handler", error })
  }
})

export default app;