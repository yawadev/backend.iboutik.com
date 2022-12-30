// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name } = req.body
    const result = await prisma.role.create({
        data: {
            name,
        },
    })
    res.json(result)
}
