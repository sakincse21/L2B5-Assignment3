import { model, Schema } from "mongoose";
import { IBorrow, IBorrowStaticMethods } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow, IBorrowStaticMethods>({
    book:{
        type: Schema.Types.ObjectId,
        required: [true, "Please provide the book's reference Id."],
        ref: 'book'
    },
    quantity:{
        type: Number,
        required: [true, "Please insert a valid quantity."],
        min: 0
    },
    dueDate:{
        type: Date,
        required: [true, "Please add a due date."]
    }
},{
    timestamps: true
})

borrowSchema.static('setAvailability',async (currentBorrow,borrowedBook)=>{
    return (currentBorrow.quantity==borrowedBook.copies)?false:true;    
})

borrowSchema.pre('save',async function(next){
    const quantity = this.quantity;
    if(quantity<=0){
        throw new Error("Please enter valid quantity");
    }

    const bookId = this.book;
    
    const book = await Book.findOne({_id: bookId});

    if(!book){
        throw new Error("Book does not exist");
    }

    if(book.copies<this.quantity || book.available === false){
        throw new Error("Not enough books are available")
    }
    
    const remainingCopies = book.copies - this.quantity;
    const availability = await Borrow.setAvailability(this,book);

    await Book.findByIdAndUpdate(bookId,{
        copies: remainingCopies,
        available: availability
    })
    next();
})


const Borrow = model<IBorrow, IBorrowStaticMethods>('borrow', borrowSchema);

export default Borrow;