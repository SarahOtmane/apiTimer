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


exports.listAllTimes = async (req, res) =>{
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

        try{
            const times = await Timer.find({user_id : req.user.id});
            res.status(200);
            res.json(times);
        }
        catch(error){
            res.status(500);
                console.log(error);
                res.json({ message : 'Erreur serveur'});
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

exports.averageTime = async (req, res) =>{
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

        try{
            const times = await Timer.find({user_id : req.user.id});
            let tabTimes = [];
            for(let i=0; i<times.length; i++){
                tabTimes.push(times[i].time);
            }

            let average = 0;
            for(let i=0; i<tabTimes.length; i++){
                average += tabTimes[i];
            }

            average = average/tabTimes.length;

            res.status(200);
            res.json(average);
        }
        catch(error){
            res.status(500);
                console.log(error);
                res.json({ message : 'Erreur serveur'});
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