const LOAN_DAYS = 30;
const { Op } = require("sequelize");
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

        const foundMember = await Member.findByPk(memberId);
        if(!foundMember) {
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

        const updatedLoans = await Loan.update(
            { returnDate: currentDate },
            {
                where: {
                    bookId: bookId,
                    returnDate: null
                },
            }
        );

        res.status(200).send({canceledLoans: updatedLoans[0]})
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

const getLoans = async (req, res) => {
    try {
        console.log(req.user);
        const memberId = req.query.memberId;
        const activeLoans = req.query.activeLoans;

        //CREAMOS LOS FILTROS DE LA API getLoans
        const whereFilter = {};

        if (memberId) {
            whereFilter.memberId = memberId;
        }
        if (activeLoans === "true") {
            whereFilter.returnDate = null;
        }
        if (activeLoans === "false") {
            whereFilter.returnDate = {
                [Op.not]: null
            }
        }
        //

        const loans = await Loan.findAll(
            {
                where: whereFilter,
                include: [
                    { model: Book, attributes: ['title'] }, 
                    { model: Member, attributes: ['name']}
                ]
            }
        );
    
        const parsedLoans = loans.map((loan) => {
            return {
                returnDate: loan.returnDate,
                loanDate: loan.loanDate,
                deadline: loan.deadline,
                bookId: loan?.BookId,
                memberId: loan?.MemberId,
                bookTitle: loan?.Book?.title,
                memberName: loan?.Member?.name
            }
        })

        console.log(whereFilter);
        res.status(200).send(parsedLoans);
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

exports.loanBookToMember = loanBookToMember;
exports.returnBook = returnBook;
exports.getLoans = getLoans;