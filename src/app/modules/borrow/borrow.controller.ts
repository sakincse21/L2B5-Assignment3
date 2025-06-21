import { Request, Response } from "express";
import Borrow from "./borrow.model";
import handleError from "../../utils/errorHandler";

const borrowBook = async (req:Request, res: Response)=>{
    try {
        const payload = req.body;
        const data = await Borrow.create(payload)
        if(!data){
            throw new Error("No Borrow Record Created")
        }
        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        })
    } catch (error: unknown) {
        handleError(error,res,200);
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
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ])
        res.send({
            message: "Borrowed books summary retrieved successfully",
            success: true,
            data
        })
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

export const borrowControllers = {
    borrowBook, borrowedBookSummary
}