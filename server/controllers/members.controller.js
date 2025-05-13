const Member = require("../models/Member");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json") ["development"];

const getMembers = async (req, res) => {
    const users = await Member.findAll();
    res.status(200).send(users);
}

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

        let token = jwt.sign({ userId: user.id }, jwt_secret);

        res.status(201).send({token: token});
        console.log('Member logged');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }   
}

const createMember = async (req, res) => {
    const memberName = req.body.name;
    const memberUsername = req.body.username;
    const memberPassword = req.body.password;
    
    //Validar e impedir el registro si existe un usuario o no introducimos el usuario
    
    try {
        const existingUser = await Member.findOne({
            where: {
                user: memberUsername
            }
        })

        if (existingUser) {
            res.status(400).send("User already");
            return;
        } else 

        if (!memberName || !memberUsername || !memberPassword) {
            res.status(400).send("Please enter member name, username & password");
            return;
        }
            //Creamos y registramos el usuario con la contraseña HASHEADA
            const createdMember = await Member.create({
                name: memberName,
                registration_date: new Date(),
                user: memberUsername,
                password: bcryptjs.hashSync(memberPassword)
            });
            res.status(201).send({id: createdMember.id});
            console.log('Member registed');
        
    } catch (error) {
        res.status(500).send("Unexpected register error", error);
        console.log(error);
    }   
}

exports.getMembers = getMembers;
exports.login = login;
exports.createMember = createMember;