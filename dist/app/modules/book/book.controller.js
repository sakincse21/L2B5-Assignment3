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
exports.bookControllers = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const data = yield book_model_1.default.create(payload);
        if (!data) {
            throw new Error("No Book Created");
        }
        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit, offset } = req.query;
        const filterOption = filter ? { genre: filter } : {};
        const sortCheck = sort ? (sort === 'asc' ? '' : '-') : '';
        const sortOption = sortBy ? `${sortCheck}${sortBy}` : `${sortCheck}createdAt`;
        const limitOption = limit ? parseInt(limit) : 12;
        const tempData = yield book_model_1.default.find(filterOption);
        const count = tempData.length;
        const data = yield book_model_1.default.find(filterOption).sort(sortOption).skip(parseInt(offset)).limit(limitOption);
        // res.setHeader('Access-Control-Expose-Headers', 'x-count')
        // res.setHeader('x-count', count)
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            totalCount: count,
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
        if (!data) {
            throw new Error("No Book Found");
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const payload = req.body;
        if ((payload === null || payload === void 0 ? void 0 : payload.copies) === 0) {
            payload.available = false;
        }
        else if (payload.copies && payload.copies > 0) {
            payload.available = true;
        }
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, payload, { new: true, runValidators: true });
        if (!data) {
            throw new Error("No Book Found");
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.deleteOne({ _id: bookId }, { new: true });
        let deletedData;
        if ((data === null || data === void 0 ? void 0 : data.deletedCount) > 0) {
            deletedData = {};
        }
        else {
            throw new Error("No Book Found.");
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedData
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, res, 200);
    }
});
exports.bookControllers = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
