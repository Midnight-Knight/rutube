import styles from "./page.module.css";
import Heading from "@/components/heading";
import Row from "@/components/row";
import LinkPage from "@/components/buttons/linkPage";

export default function Home() {
  return (
      <main className={styles.main}>
          <Heading title={"Видео"} text={null}/>
          <Row>
              <LinkPage link={"/video_add"} text={"Пополнение базы"}/>
              <LinkPage link={"/video_moderation"} text={"Модерация"}/>
          </Row>
          <Heading title={"Аудио"} text={null}/>
          <Row>
              <LinkPage link={"/audio_add"} text={"Пополнение базы"}/>
              <LinkPage link={"/audio_moderation"} text={"Модерация"}/>
          </Row>
      </main>
  );
}
