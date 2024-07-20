import styles from '../(styles)/Page2.module.css';
import Image from 'next/image';
import homeImage from '../../public/images/home-background.webp';

export default function Page2() {
  return (
    <div className={styles.page}>
      <h1>Page 2</h1>
      <p>This is Page 2 with its own CSS module.</p>
      <Image src={homeImage} alt="Home Image" width={500} height={300} />
    </div>
  );
}
