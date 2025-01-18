// searchParams : Promise<{q:string}> 이 코드의 뜻은 searchParams는 Promise타입이며 string 타입의 q를 가지고 있다는 것
// 강의 중에서 타입 정의시 위와 같이 할 것
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(q);
  return <div>Search 페이지 : {q}</div>;
}
