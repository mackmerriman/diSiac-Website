import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const { id } = req.query;
        const post = await prisma.members.findMany()
        return res.json(post);
    }
}