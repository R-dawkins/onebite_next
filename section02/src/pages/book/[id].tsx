import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";
/* 
fallback을 사용할 때 SEO에 유의해야한다

*/
export const getStaticPaths = () => {
  /* params 객체의 값은 반드시 문자열 */
  /* 
  fallback 옵션의 속성들
  기본적으로 사전에 생성하지 않았던 경로들에 접근할 때 fallback 옵션이 사용된다.
  1. false - 404페이지로 안내됨
  2. "blocking" - 사전 렌더링하여 클라이언트에 응답하고, 해당 페이지는 서버에 저장된다 (SSR 방식)
  3. true - props가 없는 상태로 먼저 페이지부터 반환한 후 props를 계산하여 따로 반환한다 그리고 "blocking"과 마찬가지로 해당 페이지는 서버에 저장된다 (SSR 방식 + 데이터가 없는 페이지부터 반환)
  */
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // !로 반드시 params가 존재할거라 단언해도 되는 이유 >> 현재 [id].tsx는 params가 존재해야만 실행되는 파일이기 때문
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return { notFound: true };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    /* fallback일 시 SEO에 유의하여 meta태그 따로 지정해두기 */
    return (
      <>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) return "문제가 발생했습니다 다시 시도하세요";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} alt="" />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}

// [...id] catch all segment는 주소창에 /book 만으로 접속하면 인식하지 못함
// [[...id]] optional catch all segment /book 뒤에 어떻게 오더라도 인식
