import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`);
        console.table(customers.rows);
        res.send(customers.rows)
    }catch (err){
        res.status(500).send(err.message);
    }
};

export async function getCustomersById(req, res) {
    const {id} = req.params;

    try {
        const resCustomers = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        if (resCustomers.rows.length > 0) return res.send(resCustomers.rows[0]);
        res.sendStatus(404);
    }catch (err) {
        res.status(500).send(err.message);
    }
};

export async function createCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body;

    try {
        const searchCustomer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (searchCustomer.rows.length > 0) return res.sendStatus(409);
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);

    }catch (err) {
        res.status(500).send(err.message);
    } 
};

export async function updateCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;

    try {
        const searchCPF = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (searchCPF.rows.length > 0) return res.sendStatus(409);

        await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }

}