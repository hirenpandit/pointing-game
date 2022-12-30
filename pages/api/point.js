import { ObjectId } from "mongodb"
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res){
    const client = await clientPromise
    const db = client.db('planning_poker')

    if(req.method === 'POST'){
        const body = req.body

        await db.collection('games')
                .updateOne({
                    _id: new ObjectId(body._id),
                    devs: {$elemMatch : {name: body.name}}
                }, 
                {$set: {"devs.$.point": body.point}})
                .then(result => res.status(200).json({
                    message: 'successfully updated points'
                }))
                .catch(err => {
                    res.status(500).json({
                        message: 'error updating points'
                    })
                })
    }
    

}