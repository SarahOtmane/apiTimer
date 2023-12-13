const Timer = require('../models/timerModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createATimer = async(req, res) =>{
    try {
        let token = req.headers['authorization'];
        if(token != undefined){
            const payload = await new Promise((resolve, reject) =>{
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(decoded);
                    }
                })
            })

            req.user = payload;

            const newTime = new Timer({...req.body, user_id : req.user.id} ); 
            try{
                const time = await newTime.save();
                res.status(200);
                res.json(time);
            }
            catch(error){
                res.status(500);
                    console.log(error);
                    res.json({ message : 'Erreur serveur (db)'});
            }
        }else{
            res.status(403).json({message: "Accès interdit: token manquant"});
        }
    } catch (error) {
        res.status(500);
            console.log(error);
            res.json({ message : 'Erreur serveur (user inexistant)'});
    }
}