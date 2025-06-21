import { Router } from "express";
import bookRoutes from "../modules/book/book.route";
import borrowRoutes from "../modules/borrow/borrow.route";

const apiRoutes = Router();

apiRoutes.use('/books', bookRoutes);
apiRoutes.use('/borrow', borrowRoutes);

export default apiRoutes;