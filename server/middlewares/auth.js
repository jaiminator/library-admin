const Member = require("../models/Member");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json") ["development"];

const authMiddleware = async (req,res,next) => {

    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send("Missing auth header");
        return;
    }

    const payload = jwt.verify(token, jwt_secret);
    console.log(payload);

    //User id decodificado del token
    const userId = payload.userId;

    //Obtengo el objeto usuario a partir del id (SELECT)
    const user = await Member.findByPk(userId);
    if (!user) {
        res.status(401).send("INVALID AUTH HEADER");
        return;
    }
    
    //Agregar el usuario a la request que se está haciendo
    req.user = user.dataValues;

    console.log("+++++ SE EJECUTA EL MIDDLEWARE", user.dataValues);
    next();
}

exports.authMiddleware = authMiddleware;