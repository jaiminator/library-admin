const Member = require("../models/Member");

const login = async (req, res) => {
    try {
        const memberName = req.body.username;
        const password = req.body.password;
        if (password != "El.Gol.De.Iniest@.2010") {
            res.status(400).send("INCORRECT_PASSWORD");
        }
        const createdMember = await Member.findOne(
            {where: {
                name: memberName
            }});
            
            if (!createdMember) {
                res.status(404).send("INCORRECT_USERNAME");
            }
        res.status(201).send({llave: createdMember.id});
        console.log('Member created');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

const createMember = async (req, res) => {
    try {
        const memberName = req.body.name;
        if (!memberName) {
            res.status(400).send("Please enter a name of member");
            console.log("Error. Member no created");
        } else {
            const createdMember = await Member.create({
                name: memberName,
                registration_date: new Date()
            });
            res.status(201).send({id: createdMember.id});
            console.log('Member created');
        }
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

exports.createMember = createMember;
exports.login = login;