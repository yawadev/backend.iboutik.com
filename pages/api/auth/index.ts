// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await prisma.companie.findMany(
        {
            include: {
                User: true,
                _count: {
                    select: { User: true },
                },
            }
        },
    )
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(result)
}
