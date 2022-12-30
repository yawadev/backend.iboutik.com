// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import * as argon2 from "argon2";
import NextCors from 'nextjs-cors';
import jwt from 'jsonwebtoken';





async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { JWT_SECRET } = process.env;
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { email, password } = req.body
    const check = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
            name: true,
            hash: true
        },
    })
    if (check == null) {
        res.status(401).json({ status: 401, message: 'This email  does not exist..' })

    } else {
        try {
            if (await argon2.verify(check.hash, password)) {
                const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 36005 });
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        email: true,
                        name: true,
                        zone: true,
                        roleId: true,
                        isActiveted: true
                    },
                })
                res.status(200).json({ status: 200, data: user, token: token })
            } else {
                res.status(401).json({ status: 401, message: 'Invalid password...' })
            }
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Internal server error' })
        }

    }


}
export default handler;