import clientPromise from "../../lib/mongodb"

export default async function game(req, res){
    console.table(req.method)
    const client = await clientPromise
    const db = client.db('planning_poker')

    if(req.method === 'POST'){
        console.log(`creating new session`)
        db.collection('games')
        .insertOne(req.body)

        await res.status('200').json({
            message: 'created new session'
        })
    } else if(req.method === 'PUT') {
        console.log(`adding new devs to session`)
    }

    
}