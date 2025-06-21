import { Request, Response } from "express";
import Book from "./book.model";
import handleError from "../../utils/errorHandler";

const createBook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        if (payload?.copies === 0) {
            payload.available = false;
        }

        const data = await Book.create(payload);

        if(!data){
            throw new Error("No Book Created");
        }

        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data
        })
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filterOption = filter ? { genre: filter } : {};
        const sortCheck = sort ? (sort === 'asc' ? '' : '-') : '';
        const sortOption = sortBy ? `${sortCheck}${sortBy}` : `${sortCheck}createdAt`;
        const limitOption = limit ? parseInt(limit as string) : 10;
        const data = await Book.find(filterOption).sort(sortOption).limit(limitOption);
        
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

const getBookById = async (req: Request, res: Response) => {
    try {

        const bookId = req.params.bookId;
        const data = await Book.findById(bookId);
        if(!data){
            throw new Error("No Book Found")
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

const updateBook = async (req: Request, res: Response) => {
    try {

        const bookId = req.params.bookId;
        const payload = req.body;

        if (payload?.copies === 0) {
            payload.available = false;
        } else if (payload.copies && payload.copies > 0) {
            payload.available = true;
        }

        const data = await Book.findByIdAndUpdate(bookId, payload, { new: true, runValidators: true });

        if(!data){
            throw new Error("No Book Found")
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

const deleteBook = async (req: Request, res: Response) => {
    try {

        const bookId = req.params.bookId;

        const data = await Book.deleteOne({ _id: bookId }, { new: true });

        let deletedData;
        if (data?.deletedCount > 0) {
            deletedData = {}
        } else {
            throw new Error("No Book Found.")
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedData
        });
    } catch (error: unknown) {
        handleError(error,res,200);
    }
}

export const bookControllers = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}
