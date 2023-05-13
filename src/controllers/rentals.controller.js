import { db } from "../database/database.connection.js";

export async function getRentals(req, res){
    try{
        const rentals = await db.query(
            `SELECT rentals.*, customers.id, customers.name, games.id, games.name FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id 
            JOIN games ON rentals."gameId" = games.id;`);
        console.table(rentals.rows);
        res.send(rentals.rows);
    }catch (err){
        res.status(500).send(err.message);
    }

};

export async function createRentals(req, res) {
    const {customerId, gameId, daysRented} = req.body;

    try {
        //Verificar se existe usuário com o id passado
        const searchCustomerId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if (searchCustomerId.rows.length = 0) return res.sendStatus(400);

        //Verificar se existe jogo com o id passado
        const searchGameId = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        if (searchGameId.rows.length = 0) return res.sendStatus(400);

        const searchRentals =  await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null;`, [gameId]);

        //Verificar quantidade de jogos disponiveis
        const availableGames = searchGameId.rows[0].stockTotal - searchRentals.rows.length;
        if (availableGames === 0) return res.sendStatus(400);

        //Calcular o preço do aluguel e a data
        const originalPrice = daysRented * searchGameId.rows[0].pricePerDay;
        const rentDate = new Date();

        //Inserir o aluguel
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "delayFee", "originalPrice") 
                        VALUES ($1, $2, $3, $4, null, null, $5);`, 
                        [customerId, gameId, rentDate, daysRented, originalPrice ]);
        res.sendStatus(201);

    }catch (err) {
        res.status(500).send(err.message);
    }
}