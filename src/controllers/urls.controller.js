import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenURL (req, res){
    const { url} = req.body; 
    const  user_email  = res.locals.session.user_email;    

    try {
        const shortened_url = nanoid(8);
        await db.query(`INSERT INTO urls (url, shortUrl, user_email) VALUES ($1, $2, $3);`, [url, shortened_url, user_email]);
     
        const returnBody = await db.query(`SELECT * FROM urls WHERE shortUrl = $1;`, [shortened_url]);
        res.status(201).send({id : returnBody.rows[0].id, shortUrl : shortened_url});

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
        const checkUrl = await db.query(`SELECT * FROM  urls WHERE shortUrl = $1;`, [shortUrl]);
        if (checkUrl.rows.length === 0) return res.sendStatus(404);

        await db.query(`UPDATE urls SET views = views + 1, WHERE shortUrl = $1;`, [shortUrl]);
        res.redirect(checkUrl.rows[0].link);
    }    
    catch (err) {
        res.status(500).send(err.message);
    };
}