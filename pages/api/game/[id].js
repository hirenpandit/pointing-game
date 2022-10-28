import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db('planning_poker')

    const body = req.body
    const {id} = req.query
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