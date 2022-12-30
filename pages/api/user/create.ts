// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import * as argon2 from "argon2";
import NextCors from 'nextjs-cors';
import jwt from 'jsonwebtoken';


const jwt_secret: any = process.env;

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { name, email, companieId, password, roleId } = req.body
    const check = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    if (check == null) {
        const hash = await argon2.hash(password);
        //const token = jwt.sign({ email }, jwt_secret, { expiresIn: 36005 });
        const result = await prisma.user.create({
            data: {
                name,
                email,
                hash,
                companieId,
                roleId,
            },
        })

        res.status(200).json({ status: 200, data: result })
    } else {

        res.json({ 'message': "This email are already exist." })
    }


}
export default handler;