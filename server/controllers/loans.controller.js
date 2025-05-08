const LOAN_DAYS = 30;
const { now } = require("sequelize/lib/utils");
const Loan = require("../models/Loan");
const Book = require("../models/Book");
const Member = require("../models/Member");

const loanBookToMember = async (req, res) => {
    try {
        const memberId = req.body.memberId;
        const bookId = req.body.bookId;

        const foundBook = await Book.findByPk(bookId);
        if(!foundBook) {
            res.status(404).send("Book not found");
            return;
        }

        const foundmember = await Member.findByPk(memberId);
        if(!foundmember) {
            res.status(404).send("Member not found");
            return;
        }

        const currentDate = new Date();
        const calculatedDeadline = currentDate.setDate(currentDate.getDate() + LOAN_DAYS);

        const createdLoan = await Loan.create({
            loanDate: new Date(),
            deadline: calculatedDeadline,
            MemberId: memberId,
            BookId: bookId
        });
        res.status(201).send({deadline: createdLoan.deadline});
        console.log('Loan created');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}
const returnBook = async (req, res) => {
    try {
        const bookId = req.body.bookId;

        const foundBook = await Book.findByPk(bookId);
        if(!foundBook) {
            res.status(404).send("Book not found");
            return;
        }

        const currentDate = new Date();

        const returnedLoan = await Loan.update(
            { returnDate: currentDate },
            {
                where: {
                    bookId: bookId,
                    returnDate: null
                },
            }
        );

        //IMPLEMENT LOAN STATUS

        /* if(currentDate > returnedLoan.deadline) {
            res.status(200).send({status: "ontime"});
            return;
        } else if (currentDate < returnedLoan.deadline) {
            res.status(200).send({status: "delayed"});
            return;
        } */
            
        console.log('Loan updated');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

exports.loanBookToMember = loanBookToMember;
exports.returnBook = returnBook;