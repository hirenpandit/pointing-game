import clientPromise from "../../lib/mongodb"

export default async function game(req, res){
    console.table(req.method)
    const client = await clientPromise
    const db = client.db('planning_poker')

    if(req.method === 'POST'){
        console.log(`creating new session`)
        const objToInsert = req.body
        let id = null
        db.collection('games')
            .insertOne(objToInsert)
            .then(result => {           
                id = result.insertedId.toHexString()
                res.status(200).json({
                    message: 'created new session',
                    _id: id
                })
            })
    }
}