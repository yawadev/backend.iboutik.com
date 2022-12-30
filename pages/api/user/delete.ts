// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id } = req.body
    try {
        await prisma.user.delete({
            where: {
                id,
            },
        })
        res.json({ 'message': 'The User have successful deleted from database' })


    } catch (error) {
        res.json({ 'message': "Record to delete does not exist." })

    }

}
