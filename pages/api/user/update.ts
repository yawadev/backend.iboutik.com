// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import * as argon2 from "argon2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id, name, email, companieId, password, zone, roleId } = req.body

    const hash = await argon2.hash(password);

    try {

        const result = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                hash,
                companieId,
                zone,
                roleId,
            },
        })

        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
