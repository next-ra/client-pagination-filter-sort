import styles from './Item.module.css';

const Item = ({ id, name, body, email }) => {
  return (
    <li className={styles.item}>
      <p>{id}</p>
      <p>{name}</p>
      <p>{body}</p>
      <p>{email}</p>
    </li>
  );
};

export default Item;
