import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';
import Pagination from './components/Pagination';
function App() {
  const [allItems, setAllItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedBy, setSortedBy] = useState({
    id: false,
    name: false,
    email: false,
    body: false,
  });
  const [searchValue, setSearchValue] = useState('');

  // const [currentPageState, setCurrentPageState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    // setCurrentPageState(allItems.slice(firstItemIndex, lastItemIndex));
    setSortedItems(allItems.slice(firstItemIndex, lastItemIndex));
  }, [currentPage, itemsPerPage, allItems]);

  const paginateHandler = (pageNumber) => setCurrentPage(pageNumber);

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

  const sortHandler = (e) => {
    const field = e.currentTarget.id;

    setSortedBy({
      ...sortedBy,
      [field]: !sortedBy[field],
    });
    setSortedItems([...sortedItems].sort(filterBy(field)));
  };

  function filterHelper(arr, searchValue) {
    return arr.filter((obj) =>
      Object.keys(obj).some(
        (key) =>
          key !== 'id' &&
          key !== 'postId' &&
          obj[key].toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);

    const result = filterHelper(allItems, e.target.value);

    setSortedItems(result);
  };

  return (
    <div className="App">
      <Pagination
        onPaginate={paginateHandler}
        itemsPerPage={itemsPerPage}
        totalItems={allItems.length}
        currentPage={currentPage}
      />
      <input
        className="input"
        type="text"
        onChange={onChangeHandler}
        placeholder="поиск"
        value={searchValue}
      />
      <List items={sortedItems} onSort={sortHandler} sortedBy={sortedBy} />
    </div>
  );
}

export default App;
