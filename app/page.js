import Link from 'next/link';
import styles from './(styles)/Home.module.css';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Home Page</h1>
      <nav>
        <ul>
          <li><Link href="/page1">Page 1</Link></li>
          <li><Link href="/page2">Page 2</Link></li>
        </ul>
      </nav>
    </div>
  );
}
