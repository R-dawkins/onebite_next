import { notFound } from "next/navigation";
import style from "./page.module.css";

/*
  export const dynamicParams = false; 
  generateStaticParams에 해당하는 파라미터가 없다면 모두 not found로 연결
  현재 코드로 예를들어 id 1,2,3 이외 모든 파라미터는 not found로 연결되는것
*/

// 빌드타임에 파라미터를 읽어서 해당하는 페이지를 정적으로 생성하는 함수(약속됨)
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  //searchParams와 params는 promise 타입으로 받아오기 때문에 await를 사용해서 풀어줘야한다.
  //자세한 것은 https://nextjs.org/docs/messages/sync-dynamic-apis 참고
  const { id: pid } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${pid}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
