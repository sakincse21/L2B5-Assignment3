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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Validation failed. Please provide Title"],
    },
    author: {
        type: String,
        required: [true, "Validation failed. Please provide Author name"],
    },
    genre: {
        type: String,
        required: [true, "Validation failed. Please provide Genre"],
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
        type: String,
        required: [true, "Validation failed. Please provide ISBN"],
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, "Validation failed. Please provide correct Copies Number"],
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
bookSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies == 0)
            this.available = false;
        next();
    });
});
const Book = (0, mongoose_1.model)('book', bookSchema);
exports.default = Book;
