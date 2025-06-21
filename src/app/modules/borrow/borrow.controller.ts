import { Request, Response } from "express";
import Borrow from "./borrow.model";

const borrowBook = async (req:Request, res: Response)=>{
    try {
        const payload = req.body;
        const data = await Borrow.create(payload);

        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        })
    } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
        res.status(200).json({
            message: errorMessage,
            success: false,
            error
        });
    }
}

const borrowedBookSummary = async (req:Request, res: Response)=>{
    try {
        const data = await Borrow.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: "allBooks"
                }
            },{
                $unwind: "$allBooks"
            },{
                $group: {
                    _id:"$book",
                    "totalQuantity": {$sum:"$quantity"},
                    "book": {$first: "$allBooks"}
                    
                }
            },{
                $project:{
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ])
        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        })
    } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
        res.status(200).json({
            message: errorMessage,
            success: false,
            error
        });
    }
}

export const borrowControllers = {
    borrowBook, borrowedBookSummary
}