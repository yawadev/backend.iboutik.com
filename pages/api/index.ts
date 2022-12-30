// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  version: string,
  description: string,
  author: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: 'kereya-api',
    version: '0.0.1',
    description: 'A digital health solution for health for all',
    author: 'Yawa Technologie',
  })
}
