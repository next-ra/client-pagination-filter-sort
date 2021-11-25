import axios from 'axios';
import { useEffect, useState } from 'react';
import List from './components/List';
import Pagination from './components/Pagination';
import Search from './components/Search';

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

  // пагинация
  const [currentPageState, setCurrentPageState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    setCurrentPageState(allItems.slice(firstItemIndex, lastItemIndex));
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

  return (
    <div className="App">
      <Pagination
        onPaginate={paginateHandler}
        itemsPerPage={itemsPerPage}
        totalItems={allItems.length}
        currentPage={currentPage}
      />
      <Search
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setSortedItems={setSortedItems}
        currentPageState={currentPageState}
      />

      <List items={sortedItems} onSort={sortHandler} sortedBy={sortedBy} />
    </div>
  );
}

export default App;
