import styles from "./../page.module.css";
import DownloadManager from "@/manager/downloadManager";

export default function Page() {
    return <main className={styles.main}>
        <DownloadManager/>
    </main>
}