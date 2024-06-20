// pages/api/query.js
import { handleQuery } from '../../lib/queryHandler';

export async function POST(req, res) {
    const { request } = req.body;
    console.log(request)

    // if (!request) {
    //     return Response.json({ error: 'Data is required' });
    // }

    try {
        const result = await handleQuery(request == undefined ? null: request);
        // console.log(result.records)
        return Response.json(result.records)
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' })
    }
}
