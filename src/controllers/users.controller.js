import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

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
}
