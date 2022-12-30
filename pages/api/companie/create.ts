// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import * as argon2 from "argon2";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name, email, phone, manager, categorie, zoneId, roleId } = req.body
    const result = await prisma.companie.create({
        data: {
            name,
            email,
            phone,
            manager,
            categorie,
            zoneId,
        },
    })
    if (result) {

        const hash = await argon2.hash(phone);
        const user = await prisma.user.create({
            data: {
                name: manager,
                email,
                hash,
                companieId: result.id,
                roleId,
                zone: zoneId
            },
        })
        res.json({ companie: result, user: user })
    } else {
        res.json({ message: 'Erreur lors de la creation du compte' })
    }
}
