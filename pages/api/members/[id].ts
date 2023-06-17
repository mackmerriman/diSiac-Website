import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const id = String(req.query.id)
        const member = await prisma.members.findUnique({
            where: {
                memberid: id,
            },
        })
        console.log(member)
        return res.json(member);
    }
    
}