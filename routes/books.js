const Book = require("../models/book");
module.exports = function (app) {
    app.get("/", (req, res) => {
    res.redirect("/books");
    });
    app.get("/books", async(req, res) => {
        const {status, msg} = req.query;
        let filter = {};
        if(status){
            filter.status = status;
        }
        const allBooks = await Book.find(filter);
        //res.json(allBooks);
        res.render("index", { books: allBooks, status: status, msg: msg });
    });

    app.get("/add-book", async(req, res) => {
        res.render("addBook");
    });

    app.post("/add-book", async(req, res) => {
        const bookDeets = req.body;
        if(!bookDeets || !bookDeets.title || !bookDeets.author || !bookDeets.genre){
            return res.status(400).json({msg: "All fields are required."})
        }
        const result = await Book.create({
            title: bookDeets.title,
            author: bookDeets.author,
            genre: bookDeets.genre,
            status: bookDeets.status,
            review: bookDeets.review,
            rating: bookDeets.rating
        });
        //res.status(201).json({msg: "Book added successfully",res: result});
        res.redirect("/books?msg=Book added successfully");
    })
    app.delete("/delete/:id", async(req, res) => {
            const bookId = req.params.id;
            const deletedBook = await Book.findByIdAndDelete(bookId);
            if(!deletedBook){
                return res.status(404).json({msg: "Book not found"});
            }
            //else return res.json({msg: "Book deleted successfully", book: deletedBook});
            res.redirect("/books");
        });

    app.get("/edit/:id", async(req, res) => {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({msg: "Book not found"});
        }
        res.render("editBook", { book: book });
    })

    app.put("/edit/:id", async(req, res) => {
        const {title, author} = req.body;
        await Book.findByIdAndUpdate(req.params.id, {
            title,
            author
        });
        res.redirect("/books");
    });
};