const express = require('express');
const sql = require('mssql');
var config = require('./config');
var cors = require('cors');

const app = express();

app.use(express.json())
app.disable('etag');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors());


let cursorResults = null;
var sqlConfig = config.sqlConfig;

app.get('/', (req, res) => {
    res.send('AffectLabeling API')
});


app.get('/api/person/:id', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    const personId = req.params.id;

    var sqlQuery = `Select * from Persons where ID = ${personId}`
})

app.get('/api/personcode/:code', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    const personCode = req.params.code;

    var sqlQuery = `Select * from Persons where PersonCode = '${personCode}'`
})

app.get('/api/speechcode/:code', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    const personCode = req.params.code;

    var sqlQuery = `Select * from Speeches where SpeechCode = '${personCode}'`
})

app.get('/api/persons/', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    if (req.query.takeCount) takeCount = parseInt(req.query.takeCount);
    if (req.query.pageNo) pageNo = parseInt(req.query.pageNo)
    const skipCount = (pageNo - 1) * takeCount

    var sqlQuery = `SELECT top ` + takeCount + ` * FROM (
        SELECT ROW_NUMBER() OVER(ORDER BY ID desc) AS RoNum
              , *
        FROM Persons
) AS tbl 
WHERE ` + skipCount + ` < RoNum
ORDER BY tbl.ID desc`
})

app.get('/api/alstats/', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    if (req.query.takeCount) takeCount = parseInt(req.query.takeCount);
    if (req.query.pageNo) pageNo = parseInt(req.query.pageNo)
    const skipCount = (pageNo - 1) * takeCount

    var sqlQuery = `SELECT top ` + takeCount + ` * FROM (
        SELECT ROW_NUMBER() OVER(ORDER BY ID desc) AS RoNum
              , *
        FROM ALStats
) AS tbl 
WHERE ` + skipCount + ` < RoNum
ORDER BY tbl.ID desc`
})

app.get('/api/persons/count', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset[0].TotalCount
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    var sqlQuery = `select count(ID) as TotalCount from Persons`
})


app.get('/api/alstats/count', (req, res) => {
    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        let rows = result.recordset[0].TotalCount
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    var sqlQuery = `select count(ID) as TotalCount from ALStats`
})

app.post('/api/person', (req, res) => {
    console.log('post req...');
    
    
    const personCode = req.body.personCode;
    const fullName = req.body.fullName;

    console.log('fullName=' + req.body.bar);

    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).send({message: 'Success'});
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    var sqlQuery = `Insert into Persons (PersonCode, FullName, GroupTypeCode) values (N'${personCode}' ,N'${fullName}', 1) `
    console.log(sqlQuery);
    
})

app.post('/api/stats', (req, res) => {
    console.log('post req...');
    
    
    const PersonID = req.body.PersonID;
    const SpeechID = req.body.SpeechID;
    const SUDS1 = req.body.SUDS1;
    const SUDS2 = req.body.SUDS2;
    const SUDS3 = req.body.SUDS3;
    const MyFeelingAnswer = req.body.MyFeelingAnswer;
    const OthersFeelingAnswer = req.body.OthersFeelingAnswer;
    const MyFeelingAfterSpeechAnswer = req.body.MyFeelingAfterSpeechAnswer;
    const FutureFeelingAnswer = req.body.FutureFeelingAnswer;
    const MyFeeling = req.body.MyFeeling;
    const OthersFeeling = req.body.OthersFeeling;
    const MyFeelingAfterSpeech = req.body.MyFeelingAfterSpeech;
    const FutureFeeling = req.body.FutureFeeling;

    console.log('PersonID=' + PersonID);

    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).send({message: 'Success'});
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    var sqlQuery = `Insert into ALStats (PersonID, SpeechID, SUDS1, SUDS2, SUDS3, CreateDate, MyFeelingAnswer, OthersFeelingAnswer, MyFeelingAfterSpeechAnswer, FutureFeelingAnswer, MyFeeling, OthersFeeling, MyFeelingAfterSpeech, FutureFeeling) 
    values ('${PersonID}','${SpeechID}','${SUDS1}','${SUDS2}','${SUDS3}',getdate(),'${MyFeelingAnswer}','${OthersFeelingAnswer}','${MyFeelingAfterSpeechAnswer}','${FutureFeelingAnswer}',N'${MyFeeling}',N'${OthersFeeling}',N'${MyFeelingAfterSpeech}',N'${FutureFeeling}') `
    console.log(sqlQuery);
    
})


app.put('/api/person', (req, res) => {
    console.log('put req...');
    
    
    const id = req.body.id;
    const personCode = req.body.personCode;
    const fullName = req.body.fullName;

    console.log('fullName=' + req.body.bar);

    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request().query(sqlQuery)
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).send({message: 'Success'});
        sql.close();

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
    sql.close();

    var sqlQuery = `Update Persons set PersonCode = N'${personCode}', FullName = N'${fullName}' where ID = ${id} `
    console.log(sqlQuery);
    
})


const port = process.env.port || 3000;

app.listen(port, () => { console.log(`Listening on port ${port}`) })