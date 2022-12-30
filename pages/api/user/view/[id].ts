// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {

    const id: any = req.query.id

    const result = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            companie: true,
        },
    })
    res.json(result)
}
