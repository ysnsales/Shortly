import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp (req, res){
    const {name, email, password} = req.body;

    try {
        const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkEmail.rows.length > 0) return res.sendStatus(409);

        const hashPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashPassword]);
        res.sendStatus(201);

    }catch (err){
        res.status(500).send(err.message);
    }
};

export async function signIn (req, res){
    const {email, password} = req.body;

    try {
        const checkUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkUser.rows.length === 0) return res.sendStatus(401);

        const user = checkUser.rows[0];
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return res.sendStatus(401);

        const token = uuid();
        await db.query(`INSERT INTO sessions (user_email, token) VALUES ($1, $2);`, [email, token]);
        res.send({email : user.email, token: token})

    }catch (err){
        res.status(500).send(err.message);
    }
};

export async function getUsersInfo (req, res){
    const user_email = res.locals.session.user_email;

    try{
       
        const urlsQuery = await db.query(`SELECT id, url, "shortUrl", "visitCount" FROM urls WHERE user_email = $1;`, [user_email]);
        const getQuery = await db.query(
            `SELECT users.id, users.name, SUM(urls."visitCount") AS total_visits 
            FROM users 
            JOIN urls 
            ON users.email = urls.user_email
            WHERE user_email = $1
            GROUP BY users.id;`, [user_email]);
     
        const query = {
            id : getQuery.rows[0].id,
            name : getQuery.rows[0].name,
            visitCount : getQuery.rows[0].total_visits,
            shortenedUrls : urlsQuery.rows
        }

        res.status(200).send(query);

    }
    catch (err){
        res.status(500).send(err.message);
    }
};

export async function getRanking (req, res){
    try{
        const getRank = await db.query(
            `SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", SUM(urls."visitCount") AS "visitCount"
            FROM users
            LEFT JOIN urls
            ON users.email = urls.user_email
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`
            );

            res.status(200).send(getRank.rows)

    }
    catch (err){
        res.status(500).send(err.message);
    }
}