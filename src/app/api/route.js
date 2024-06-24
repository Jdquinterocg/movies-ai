// pages/api/query.js
import { handleQuery } from '../../lib/queryHandler';

export async function POST(req, res) {

    try {
        const body = await req.json();
        const { request } = body;

        const result = await handleQuery(request == undefined ? null : request);
        return Response.json({records: result.records, cypherQuery: result.cypherQuery})
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' })
    }
}
