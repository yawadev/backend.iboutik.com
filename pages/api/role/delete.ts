// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id } = req.body
    await prisma.role.delete({
        where: {
            id,
        },
    })

    res.json({ 'message': 'The companie have successful deleted from database' })

}
