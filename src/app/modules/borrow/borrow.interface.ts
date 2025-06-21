import { Model, Types } from "mongoose";
import { IBook } from "../book/book.interface";

export interface IBorrow{
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}

export interface IBorrowStaticMethods extends Model<IBorrow>{
    setAvailability(currentBorrow:IBorrow,borrowedBook:IBook):Promise<boolean>;
}