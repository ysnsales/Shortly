import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenURL (req, res){
    const { url} = req.body; 
    const  user_email  = res.locals.session.user_email;    

    try {
        const shortened_url = nanoid(8);
        await db.query(`INSERT INTO urls (url, shortened_url, user_email) VALUES ($1, $2, $3);`, [url, shortened_url, user_email]);
     
        const returnBody = await db.query(`SELECT * FROM urls WHERE shortened_url = $1;`, [shortened_url]);
        res.status(201).send({id : returnBody.rows[0].id, shortUrl : shortened_url});

    } catch (err) {
        res.status(500).send(err.message);
    };
    
};