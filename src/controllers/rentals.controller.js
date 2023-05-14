import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
    try{
        const getRentals = await db.query(`
        SELECT rentals.*, customers.id AS customer_id, customers.name AS customer_name, games.id AS game_id, games.name AS game_name
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
      `);


        const rentals = getRentals.rows.map((row) => ({
            id: row.id,
            customerId: row.customerId,
            gameId: row.gameId,
            rentDate: row.rentDate,
            daysRented: row.daysRented,
            returnDate: row.returnDate,
            originalPrice: row.originalPrice,
            delayFee: row.delayFee,
            customer: {
                id: row.customer_id,
                name: row.customer_name,
            },
            game: {
                id: row.game_id,
                name: row.game_name,
            },
        }));

        res.send(rentals);
    }catch (err){
        res.status(500).send(err.message);
    }

};

export async function createRentals(req, res) {
    const {customerId, gameId, daysRented} = req.body;

    try {
        //Verificar se existe usuário com o id passado
        const searchCustomerId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if (searchCustomerId.rows.length === 0) return res.sendStatus(400);

        //Verificar se existe jogo com o id passado
        const searchGameId = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        if (searchGameId.rows.length === 0) return res.sendStatus(400);

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
};

export async function finishRentals(req, res) {
    const {id} = req.params;

    try {
        const searchRental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);

        // Verificar se o aluguel existe
        if (searchRental.rows.length === 0) return res.sendStatus(404);

        // Verificar se o aluguel já não foi finalizado
        if (searchRental.rows[0].returnDate !== null) return res.sendStatus(400);

        const returnDate = new Date();
        const rentDate = searchRental.rows[0].rentDate;

        // Veririfcar se o número de dias de aluguel foi ultrapassado
        const diffTime = Math.abs(returnDate.getTime() - rentDate.getTime()); // diferença em milissegundos
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // conversão para dias e arredondamento para baixo

        const daysRented = searchRental.rows[0].daysRented
        const pricePerDay = (searchRental.rows[0].originalPrice) / daysRented; // preço do aluguel por dia
        let delayFee = null;

        if (diffDays > daysRented) {
            delayFee = (diffDays - daysRented) * pricePerDay;
        }  

        await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`, [returnDate, delayFee, id]);
        res.sendStatus(200);

    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRentals(req, res){
    const {id} = req.params;

    try {
        const searchRental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);

        // Verificar se o aluguel existe
        if (searchRental.rows.length === 0) return res.sendStatus(404);

        // Verificar se o aluguel já não foi finalizado
        if (searchRental.rows[0].returnDate === null) return res.sendStatus(400);

        await db.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
        res.sendStatus(200);

    }catch (err) {
        res.status(500).send(err.message);
    }
}