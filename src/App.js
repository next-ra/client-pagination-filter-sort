import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
function App() {
  const [allItems, setAllItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedBy, setSortedBy] = useState({
    id: false,
    name: false,
    email: false,
    body: false,
  });

  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
      );
      setAllItems(res.data);
      setSortedItems(res.data);
    };

    getItems();
  }, []);

  function filterBy(field) {
    if (sortedBy[field]) {
      return (a, b) => (a[field] > b[field] ? 1 : -1);
    } else return (a, b) => (a[field] > b[field] ? -1 : 1);
  }

  const filterHandler = (e) => {
    const field = e.currentTarget.id;
    console.log(field);
    setSortedBy({
      ...sortedBy,
      [field]: !sortedBy[field],
    });
    setSortedItems([...allItems].sort(filterBy(field)));
  };

  return (
    <div className="App">
      {/* <pre>{JSON.stringify(allItems, null, 2)}</pre> */}
      <List items={sortedItems} onFilter={filterHandler} sortedBy={sortedBy} />
    </div>
  );
}

export default App;
