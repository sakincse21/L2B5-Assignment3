import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title:{
        type: String,
        required: [true, "Validation failed. Please provide Title"],
    },
    author:{
        type: String,
        required: [true, "Validation failed. Please provide Author name"],
    },
    genre:{
        type: String,
        required: [true, "Validation failed. Please provide Genre"],
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn:{
        type: String,
        required: [true, "Validation failed. Please provide ISBN"],
        unique: true
    },
    description:{
        type: String
    },
    copies:{
        type: Number,
        required: [true, "Validation failed. Please provide correct Copies Number"],
        min: 0
    },
    available:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

bookSchema.pre('save',async function(next){
    if(this.copies==0) this.available=false;
    next();
})

const Book = model('book',bookSchema);

export default Book;