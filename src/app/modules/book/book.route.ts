import { Router } from "express";
import { bookControllers } from "./book.controller";

const bookRoutes = Router();

bookRoutes.post("/", bookControllers.createBook);
bookRoutes.get("/", bookControllers.getAllBooks);
bookRoutes.get("/:bookId", bookControllers.getBookById);
bookRoutes.put("/:bookId", bookControllers.updateBook);
bookRoutes.delete("/:bookId", bookControllers.deleteBook);

export default bookRoutes;