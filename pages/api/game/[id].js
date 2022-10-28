import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db('planning_poker')
    
    const {id} = req.query

    if(req.method === 'PUT') {
        const body = req.body
        console.log(`adding dev: ${body.dev} to id: ${id}`)
        await db.collection('games')
            .updateOne({
                _id: new ObjectId(id)
            },
            {
                $push: {devs: {
                    name: body.dev, 
                    isAdmin: false 
                }}
            })
        res.status(200).json({
            message: 'adde new dev'
        })
    }
    if(req.method === 'GET') {
        console.log(`fetching session :${id}`)
        const result = await db.collection('games')
                                .find({_id: new ObjectId(id)})
                                .toArray()
        console.log(`result: ${result}`)
        console.debug(result)
        res.status(200).json(result)
    }
    
}