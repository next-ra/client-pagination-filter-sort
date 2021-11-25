import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
function App() {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
      );
      setAllItems(res.data);
    };

    getItems();
  }, []);

  return (
    <div className="App">
      {/* <pre>{JSON.stringify(allItems, null, 2)}</pre> */}
      <List items={allItems} />
    </div>
  );
}

export default App;
