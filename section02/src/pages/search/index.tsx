import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; // page router
import { ReactNode, useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'; app router
import BookItem from "@/components/book-item";
/* import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next"; */
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";
/* export const getStaticProps = async (
  context: GetStaticPropsContext // 브라우저 요청에 대한 모든 정보가 context에 들어있다
) => {
  const q = context.query.q;
  // SSG 방식은 빌드타임에 실행되기 때문에 쿼리스트링을 알 수 없다
  // 따라서 빌드타임 이후 컴포넌트 실행 후 기존 react 방식에서 했던 것처럼 따로 쿼리스트링을 불러와야한다.
  const books = await fetchBooks(q as string); // 타입 단언
  return {
    props: { books },
  };
}; */
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
