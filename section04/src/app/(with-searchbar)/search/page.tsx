import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
// searchParams: Promise<{ q: string }>
export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
