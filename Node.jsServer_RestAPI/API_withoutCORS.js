const oracledb = require('oracledb');

const express = require('express');
const app = express();
const router = express.Router()
const port = 3000;

const dbConfig = require('./dbconfig.js');

/*
router.param('opcaoListagem', async function  (req, res, next, opcaoSelect) {
    let connection; //Declaração de variável de escopo de bloco.
    connection = await oracledb.getConnection(dbConfig);
    
    let sql; //let declaração de variável de escopo de bloco.
    let binds, options, result;
    let todasTabelas = ["RELEASES", "PLATAFORMS", "GAMES"];
    let indexTabelas = 0;
    let opcao1Tabela = opcaoSelect;
    
    if (opcao1Tabela === 'todas') {
        indexTabelas = 2;
        opcao1Tabela = todasTabelas[indexTabelas];
    }
    while (indexTabelas >= 0) {
        sql = `SELECT * FROM (${opcao1Tabela})`;
        binds = {};
        options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT //query result format
        };
        result = await connection.execute(sql, binds, options);
        res.json(result); //falta msg de erro
        //res.sendStatus(200).json(result);
        //res.send(JSON.stringify(result));
        
        indexTabelas--;
        if (indexTabelas > -1)
            opcao1Tabela = todasTabelas[indexTabelas];
    }
    next();
});
router.get('/select/:opcaoListagem', function (req, res) {
    let teste = req.query.opcaoSelect;
    console.log('HTTP GET REQUEST '+ req.query.opcaoSelect +' On: ', Date.now());
    
});
*/
router.get('/select/', async (req, res) => {
    let connection; //Declaração de variável de escopo de bloco.

    connection = await oracledb.getConnection(dbConfig);
    
    let sql; //let declaração de variável de escopo de bloco.
    let binds, options, result;
    let todasTabelas = ["RELEASES", "PLATAFORMS", "GAMES"];
    let indexTabelas = 0;
    let opcao1Tabela = req.query.opcaoSelect;
    
    if (opcao1Tabela === 'todas') {
        indexTabelas = 2;
        sql = `SELECT * FROM (${todasTabelas[indexTabelas]})`;
    }
    else{
        if (opcao1Tabela === 'GAMES' || opcao1Tabela === 'PLATAFORMS'){
            if (req.query.daTabelaEmQue.length > 0){
                sql = `SELECT * FROM (${opcao1Tabela}) 
                      WHERE NAME = '${req.query.daTabelaEmQue}'`;
            }
            else{
                sql = `SELECT * FROM (${opcao1Tabela})`;
            }
        }
        else{
            if (opcao1Tabela === 'RELEASES'){
                console.log("req.query.daTabelaEmQue: "+req.query.daTabelaEmQue);
                if (req.query.daTabelaEmQue.toString.length > 0){
                    sql = `SELECT * FROM (${opcao1Tabela}) 
                            WHERE GAME = '${req.query.daTabelaEmQue}' 
                            OR PLATAFORM = '${req.query.daTabelaEmQue}'`;
                }
                else{
                    sql = `SELECT * FROM (${opcao1Tabela})`;
                }
            }
        }

    }

    let finalResult = [];
    while (indexTabelas > -1) {
        //valor para sql já atribuído.
        console.log("sql = "+sql);

        binds = {};

        options = {
            //outFormat: oracledb.OUT_FORMAT_OBJECT //query format result 
            outFormat: oracledb.OBJECT
        };

        result = await connection.execute(sql, binds, options);
        console.log(result.rows);
        let teste  = result;
        
        finalResult.push(teste);//falta msg de erro quando teste == null
        

        indexTabelas = indexTabelas - 1;
        if (indexTabelas > -1){
            sql = `SELECT * FROM (${todasTabelas[indexTabelas]})`;
        }
    }
    console.log("Array finalResult: "+JSON.stringify(finalResult));
    let aux = [];
    for (let temp in finalResult){
        console.log("resultado1 (array de objetos da propriedade rows):"+JSON.stringify(finalResult[temp].rows));
        for (let temp2 in finalResult[temp].rows){
            console.log("resultado2 (cada objeto da propriedade rows):"+JSON.stringify(finalResult[temp].rows[temp2]));
            aux.push(/* JSON.stringify */(finalResult[temp].rows[temp2]));
        }
    }
        
    console.log("Resultado final: "+aux);
    res.json(aux);
});

// /^\/insert\/(\w+)(?:\.\.(\w+))?(?:\.\.(\w+))?(?:\.\.(\w+))?$/
//'/insert/
router.post(/^\/insert\/(\w+)(?:\.\.(\w+))?(?:\.\.(\w+))?(?:\.\.(\w+))?$/, async (req, res) => {

    let inputs = [];
    
    for (let i = 0; i < 4; i++){
        if (req.params[i] != undefined){
            inputs.push(req.params[i]);
        }
    }

    let connection; //Declaração de variável de escopo de bloco.
    connection = await oracledb.getConnection(dbConfig);

    console.log('HTTP POST REQUEST: ' + inputs + ' inputs');
    console.log('HTTP POST REQUEST length' + inputs.length + ' inputs');

    let nomeTabela;
    switch (inputs.length) {
        case 1:
            nomeTabela = "RENNESFREITAS.PLATAFORMS"
            sql = `INSERT INTO ${nomeTabela} VALUES (:1, :2)`;
            binds = [
                [100, inputs[0]]
            ];

            options = {
                autoCommit: true,
                bindDefs: [
                    { type: oracledb.NUMBER },
                    {
                        type: oracledb.STRING, maxSize: 255
                    }
                ]
            };

            break;
        case 2:
            nomeTabela = "RENNESFREITAS.GAMES"
            sql = `INSERT INTO ${nomeTabela} VALUES (:1, :2, :3)`;
            binds = [
                [100, inputs[0], inputs[1]]
            ];

            options = {
                autoCommit: true,
                bindDefs: [
                    { type: oracledb.NUMBER },
                    {
                        type: oracledb.STRING, maxSize: 255
                    },
                    {
                        type: oracledb.STRING, maxSize: 255
                    }
                ]
            };

            break;
        case 3:
            res.json({message: "Tabela corespondente nao encontrada."});
            
            break;
        case 4:
            // FORMATO ACEITO input: 10, 45, DATA, 11
            nomeTabela = "RENNESFREITAS.RELEASES"
            sql = `INSERT INTO ${nomeTabela} (GAME, PLATAFORM, VERSION) VALUES (:1, :2, :3)`;
            binds = [
                [parseInt(inputs[0]), parseInt(inputs[1]), parseInt(inputs[3])]
            ];

            options = {
                autoCommit: true,
                bindDefs: [
                    { type: oracledb.NUMBER },
                    { type: oracledb.NUMBER },
                    //{ type: oracledb.DATE },
                    { type: oracledb.NUMBER }
                ]
            };

            break;
    }

    result = await connection.executeMany(sql, binds, options);
    res.json(result);
});

router.delete('/delete/', async (req, res) => {
    console.log('HTTP DELETE REQUEST  On: ', Date.now());
    let connection; //Declaração de variável de escopo de bloco.

    connection = await oracledb.getConnection(dbConfig);

    let sql; //let declaração de variável de escopo de bloco.
    let binds, options, result;
    let todasTabelas = ["RELEASES", "PLATAFORMS", "GAMES"];
    let indexTabelas = 0;
    let opcao4Tabela = req.query.opcaoDelete;
    //0 falso, 1 verdadeiro
    switch (opcao4Tabela) {
        case 'GAMES': //verificar dependências

            let GAMESgame_IdOrName = req.query.GAMESgame_IdOrName;

            let testeTipoletGAMES = parseInt(GAMESgame_IdOrName);
            if (testeTipoletGAMES.toString() === 'NaN') {
                sql = `DELETE FROM ${opcao4Tabela} 
                                WHERE NAME = '${GAMESgame_IdOrName}'`
                    ;
            }
            else {
                sql = `DELETE FROM ${opcao4Tabela} 
                                      WHERE GAMES_ID = ${parseInt(GAMESgame_IdOrName)}`
                    ;
            }
            console.log(sql);

            binds = {};

            options = {
                autoCommit: true
            };

            result = await connection.execute(sql, binds, options);
            //console.log("Number of affected rows: " + result.rowsAffected);
            res.json(result);

            break;
        case 'PLATAFORMS': //verificar dependências
            let PLATAFORMSplataforms_IdOrName = req.query.PLATAFORMSplataforms_IdOrName

            let testeTipoletPLATAFORMS = parseInt(PLATAFORMSplataforms_IdOrName);
            if (isNaN(testeTipoletPLATAFORMS)) {
                sql = `DELETE FROM ${opcao4Tabela} 
                                WHERE NAME = '${PLATAFORMSplataforms_IdOrName}'`
                    ;
            }
            else {
                sql = `DELETE FROM ${opcao4Tabela} 
                                      WHERE PLATAFORMS_ID = ${parseInt(PLATAFORMSplataforms_IdOrName)}`
                    ;
            }


            binds = {};

            options = {
                autoCommit: true
            };

            result = await connection.execute(sql, binds, options);
            //console.log("Number of affected rows: " + result.rowsAffected);
            res.json(result);

            break;
        case 'RELEASES':
            let game = req.query.game;
            let plataform = req.query.plataform;
            let version = req.query.version;
            sql = `DELETE FROM ${opcao4Tabela} 
                                    WHERE GAME = ${game}
                                    AND PLATAFORM = ${plataform}
                                    AND VERSION = ${version}`;

            binds = {};

            options = {
                autoCommit: true
            };
            try {
                console.log(sql);
                result = await connection.execute(sql, binds, options);
                console.log("Number of affected rows: " + result.rowsAffected);
                res.json(result);

            } catch (e) {
                console.error(err);
            }
            break;
        default:
            res.json({ message: "Wrong table name" });
    }
});

router.all('*', function (req, res, next) {
    res.send('Request Method not defined');
    next();
});

app.use(router);

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})