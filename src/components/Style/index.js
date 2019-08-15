import styles from './style.scss';

export const Title = (props) => (
  <h1 className={styles['title']}>{props.children}</h1>
);