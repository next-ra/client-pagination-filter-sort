import Item from './Item';

const List = ({ items }) => {
  return (
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
  );
};

export default List;
