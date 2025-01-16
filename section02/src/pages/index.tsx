import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  // getServerSideProps : next에서 약속된 함수인 getServerSideProps와 같은 함수를 내보내면 해당 페이지는 SSR로 동작하게 된다.
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // window.location과 같이 윈도우 객체에 접근하려 해도 reference Error가 발생한다. (서버 사이드에서만 동작하여 window 객체를 찾을 수 없음)

  // getStaticProps : next에서 약속된 함수인 getStaticProps는 해당 페이지를 SSG로 동작하게 한다.
  // 빌드타임에 미리 js파일을 실행하여 생성해두게 하는 역할이다.
  // 개발모드에서는 정상동작하지 않는다.

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  // Promise.all을 사용하면 Promise.all([배열]) 배열안의 함수들이 병렬로 작동하게 된다. (동시에 fetch)
  console.log("인덱스 페이지");
  return {
    props: { allBooks, recoBooks },
  };
};
// InferGetServerSidePropsType<typeof getServerSideProps> 이 타입은 getServerSideProps의 반환값 타입을 자동으로 추론해주는 타입이다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // SSR로 동작할 때 컴포넌트는 처음 서버에서 한번, 그리고 브라우저에 JS 번들링하여 넘겨질때 (hydration) 한번 총 2번 실행되는 것을 유의
  // 그렇기 때문에 window.location과 같이 윈도우 객체에 접근하려고 하면 처음 서버에서 실행될 때 reference Error가 발생한다.
  // useEffect를 사용하면 해결가능
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
// 자바스크립트의 함수는 객체이기 때문에 Home.getLayout과 같이 메서드도 추가가 가능하다
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
