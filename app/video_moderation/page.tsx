import styles from '@/app/page.module.css';
import ModerationManager from '@/manager/moderationManager';

export default function Page() {
  return (
    <main className={styles.main}>
      <ModerationManager />
    </main>
  );
}
