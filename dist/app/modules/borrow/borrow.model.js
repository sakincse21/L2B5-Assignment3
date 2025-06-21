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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../book/book.model"));
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Please provide the book's reference Id."],
        ref: 'book'
    },
    quantity: {
        type: Number,
        required: [true, "Please insert a valid quantity."],
        min: 0
    },
    dueDate: {
        type: Date,
        required: [true, "Please add a due date."]
    }
}, {
    timestamps: true
});
borrowSchema.static('setAvailability', (currentBorrow, borrowedBook) => __awaiter(void 0, void 0, void 0, function* () {
    return (currentBorrow.quantity == borrowedBook.copies) ? false : true;
}));
borrowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = this.quantity;
        if (quantity <= 0) {
            throw new Error("Please enter valid quantity");
        }
        const bookId = this.book;
        const book = yield book_model_1.default.findOne({ _id: bookId });
        if (!book) {
            throw new Error("Book does not exist");
        }
        if (book.copies < this.quantity || book.available === false) {
            throw new Error("Not enough books are available");
        }
        const remainingCopies = book.copies - this.quantity;
        const availability = yield Borrow.setAvailability(this, book);
        yield book_model_1.default.findByIdAndUpdate(bookId, {
            copies: remainingCopies,
            available: availability
        });
        next();
    });
});
const Borrow = (0, mongoose_1.model)('borrow', borrowSchema);
exports.default = Borrow;
