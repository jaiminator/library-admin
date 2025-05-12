const Book = require("../models/Book");

const getBooks = async (req, res) => {
    const books = await Book.findAll();
    res.status(200).send(books);
}

const createBook = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const publicationYear = req.body.publication_year;
    const isbn = req.body.ISBN;

    const createdBook = await Book.create({
        title: title,
        description: description,
        author: author,
        publication_year: publicationYear,
        ISBN: isbn
    });
    res.status(201).send({id: createdBook.id});
    console.log("Book created")
}

exports.getBooks = getBooks;
exports.createBook = createBook;