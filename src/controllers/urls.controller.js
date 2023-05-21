import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenURL (req, res){
    const { url } = req.body; 
    const  user_email  = res.locals.session.user_email;    

    try {
        const shortUrl = nanoid(8);
        await db.query(`INSERT INTO urls (url, "shortUrl", user_email) VALUES ($1, $2, $3);`, [url, shortUrl, user_email]);
     
        const returnBody = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        res.status(201).send({id : returnBody.rows[0].id, shortUrl : shortUrl});

    } 
    catch (err) {
        res.status(500).send(err.message);
    };
    
};

export async function getUrlById (req, res){
    const { id } = req.params;

    try {
        const checkUrl = await db.query(`SELECT * FROM  urls WHERE id = $1;`, [id]);
        if (checkUrl.rows.length === 0) return res.sendStatus(404);

        const shortUrl = await db.query(`SELECT id, "shortUrl", "url" FROM urls WHERE id = $1;`, [id]); 
        res.status(201).send(shortUrl.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
    };

};

export async function openShortUrl (req, res){
    const {shortUrl} = req.params;
    
    try{
        const checkUrl = await db.query(`SELECT * FROM  urls WHERE "shortUrl" = $1;`, [shortUrl]);
        if (checkUrl.rows.length === 0) return res.sendStatus(404);

        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`, [shortUrl]);
        res.redirect(checkUrl.rows[0].link);
    }    
    catch (err) {
        res.status(500).send(err.message);
    };
};

export async function deleteUrl (req, res){
    const { id } = req.params;
    const user_email = res.locals.session.user_email;

    try{
        const checkUrlOwner = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if (checkUrlOwner.rows.length === 0) return res.sendStatus(404);
        if (checkUrlOwner.rows[0].user_email !== user_email) return res.sendStatus(401);
        console.log(checkUrlOwner.rows[0])

        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    };

}