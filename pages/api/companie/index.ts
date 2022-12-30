// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const result = await prisma.companie.findMany(
        {
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                manager: true,
                categorie: true,
                zoneId: true,
                User: {
                    select: {
                        email: true,
                        name: true,
                        zone: true,
                        roleId: true,
                        isActiveted: true
                    },
                }, _count: {
                    select: { User: true },
                },
            }
        },
    )
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(result)
}
