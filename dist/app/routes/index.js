"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = __importDefault(require("../modules/book/book.route"));
const borrow_route_1 = __importDefault(require("../modules/borrow/borrow.route"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.use('/books', book_route_1.default);
apiRoutes.use('/borrow', borrow_route_1.default);
exports.default = apiRoutes;
