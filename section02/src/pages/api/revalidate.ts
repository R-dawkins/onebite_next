import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try{
    await res.revalidate('/')
    return res.json({revalidate:true});
  } catch(err){
    res.status(500).send(`${err} Revalidation Failed`)
  }
}

/* 
On-demand revlidation ISR (주문형 재 검증 ISR) : 요청 시 재검증-재생성하여 응답
대부분의 Next js 앱들이 ISR을 사용하고 있으니 적극 활용할것
*/