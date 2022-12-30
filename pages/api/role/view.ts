// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id } = req.body

    const result = await prisma.role.findUnique({
        where: {
            id,
        },
        include: {
            User: true,
        },
    })
    return res.json(result)
}
