const Book = require("../models/Book");
const Loan = require("../models/Loan");

const getBooks = (req, res) => {
    res.send("Test");
}

const createBook = async (req, res) => {
    const createdBook = await Book.create({
        title: "Cinco semanas en globo",
        description: "Hola",
        author: "anonymous",
        publication_year: 1965,
        stock: 7});
    res.send(createdBook.id);
}

exports.getBooks = getBooks;
exports.createBook = createBook;