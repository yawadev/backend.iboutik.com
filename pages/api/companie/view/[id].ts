// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    const id: any = req.query.id

    const result = await prisma.companie.findUnique({
        where: {
            id
        },
        include: {
            User: true,
            _count: {
                select: { User: true },
            },
        },
    })
    res.json(result)
}
