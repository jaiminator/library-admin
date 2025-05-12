const Member = require("../models/Member");

const authMiddleware = async (req,res,next) => {
    
    //REVISAR LA LLAVE DEL USUARIO
    const userKey = req.headers["llave"];
    if (!userKey) {
        res.status(401).send("MISSING_AUTH THERE")
    }
    //LLAVE ES EL id DEL USUARIO
    const user = await Member.findByPk(userKey);
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