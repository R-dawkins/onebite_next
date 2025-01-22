import ClientComponent from "../../components/client-component";
import styles from "./page.module.css";
import ServerComponent from "../../components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      {/* 
      Client Component에서 직접적으로 Server Component를 import 해서 사용하면 next에서 자동으로 Server Component를 Client Component로 변환한다
      그러나 직접 import하지 않고 children을 활용하면  Client component가 Server Component를 직접 실행하지 않고
      실행된 결과물만 children이라는 props로 전달 받도록 구조가 변경되기 때문에 Server Component가 2번 실행되지 않게 된다.
      */}
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
