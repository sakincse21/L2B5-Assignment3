"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowControllers = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const data = yield borrow_model_1.default.create(payload);
        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
        res.status(200).json({
            message: errorMessage,
            success: false,
            error
        });
    }
});
const borrowedBookSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.default.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: "allBooks"
                }
            }, {
                $unwind: "$allBooks"
            }, {
                $group: {
                    _id: "$book",
                    "totalQuantity": { $sum: "$quantity" },
                    "book": { $first: "$allBooks" }
                }
            }, {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ]);
        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        });
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
        res.status(200).json({
            message: errorMessage,
            success: false,
            error
        });
    }
});
exports.borrowControllers = {
    borrowBook, borrowedBookSummary
};
