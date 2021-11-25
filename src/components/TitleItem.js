import styles from './TitleItem.module.css';

const TitleItem = ({ onSort, title, sortedBy, id }) => {
  return (
    <div onClick={onSort} id={id} className={styles.cell}>
      <h4>{title}</h4>
      {sortedBy[`${id}`] ? <span>&#9660;</span> : <span>&#9650;</span>}
    </div>
  );
};

export default TitleItem;
