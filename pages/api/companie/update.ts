// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id, name, email, phone, manager, categorie, zoneId } = req.body

    const result = await prisma.companie.upsert({
        where: { id },
        update: {
            name,
            email,
            phone,
            manager,
            categorie,
            zoneId,
        },
        create: {
            name,
            email,
            phone,
            manager,
            categorie,
            zoneId,
        },
    })

    res.json(result)
}
