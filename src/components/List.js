import Item from './Item';
import styles from './List.module.css';
import TitleItem from './TitleItem';
const List = ({ items, onFilter, sortedBy }) => {
  const titles = ['id', 'name', 'body', 'email'];

  return (
    <>
      <div className={styles.titles}>
        {titles.map((title) => (
          <TitleItem
            key={title}
            onFilter={onFilter}
            title={title}
            sortedBy={sortedBy}
            id={title}
          />
        ))}
      </div>

      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            body={item.body}
            email={item.email}
            name={item.name}
          />
        ))}
      </ul>
    </>
  );
};

export default List;
