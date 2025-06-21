import { Response } from "express";

const handleError = (error:unknown,res:Response,statusCode:number)=>{
    const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
        res.status(statusCode).json({
            message: errorMessage,
            success: false,
            error
        });
}

export default handleError;