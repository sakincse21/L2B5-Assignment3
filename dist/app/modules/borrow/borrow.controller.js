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
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const data = yield borrow_model_1.default.create(payload);
        if (!data) {
            throw new Error("No Borrow Record Created");
        }
        res.send({
            message: "Book borrowed successfully",
            success: true,
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
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
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.send({
            message: "Borrowed books summary retrieved successfully",
            success: true,
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
exports.borrowControllers = {
    borrowBook, borrowedBookSummary
};
