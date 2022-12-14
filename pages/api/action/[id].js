import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handle(req, res) {
    const client = await clientPromise
    const db = client.db('planning_poker')

    const {id, action, by} = req.query
    console.log(`performing action ${action} on id ${id} by {by}`)

    if(action==='show'){
        await db.collection('games')
                .updateOne({
                    _id: new ObjectId(id)
                },{
                    $set: {"show": true}
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: 'error showing points'
                    })
                })
    } else if(action==='reset'){
        const body = req.body
        await db.collection('games')
            .updateMany({
                _id: new ObjectId(body._id)
            },
            {
                $set: {"devs.$[].point": 0, "show": false},
            }
            ).catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'error clearing points'
                })
            })
    }

    res.status(200).json({
        "message": `successfully performed action: ${action}`,
        "by": by,
    })
    res.end()
}