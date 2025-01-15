import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; // page router
import { ReactNode } from "react";
// import { useRouter } from 'next/navigation'; app router
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
export const getServerSideProps = async (
  context: GetServerSidePropsContext // 브라우저 요청에 대한 모든 정보가 context에 들어있다
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string); // 타입 단언
  return {
    props: { books },
  };
};
export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
