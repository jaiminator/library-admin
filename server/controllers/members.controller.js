const { where } = require("sequelize");
const Member = require("../models/Member");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        //Busca y comprueba si existe el usuario introducido en el body
        const user = await Member.findOne(
            {where: {
                user: username
            }});
            
        if (!user) {
            res.status(400).send("INCORRECT_USER_OR PASSWORD");
        }

        //Compara y comprueba mediante hash, la contraseña del usuario introducido
        const isPasswordMatch = bcryptjs.compareSync(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).send("INCORRECT_USER_OR PASSWORD");
        }
            
        res.status(201).send({llave: user.id});
        console.log('Member logged');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

const createMember = async (req, res) => {
    try {
        const memberName = req.body.name;
        const memberUser = req.body.username;
        const memberPassword = req.body.password;

        //Validar e impedir el registro si existe un usuario o no introducimos el usuario

        const user = await Member.findOne({
            where: {
                user: memberUser
            }
        })

        if (user) {
            res.status(400).send("Error. Duplicate user");
        } else 

        if (!memberName) {
            res.status(400).send("Please enter a name of member");
        } else {
            //Creamos y registramos el usuario con la contraseña HASHEADA
            const createdMember = await Member.create({
                name: memberName,
                registration_date: new Date(),
                user: memberUser,
                password: bcryptjs.hashSync(memberPassword)
            });
            res.status(201).send({id: createdMember.id});
            console.log('Member registed');
        }
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

exports.createMember = createMember;
exports.login = login;