import styles from './Search.module.css';

const Search = ({
  setSearchValue,
  searchValue,
  setSortedItems,
  currentPageState,
}) => {
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

    const result = filterHelper(currentPageState, e.target.value);

    setSortedItems(result);
  };

  return (
    <input
      className={styles.input}
      type="text"
      onChange={onChangeHandler}
      placeholder="поиск"
      value={searchValue}
    />
  );
};

export default Search;
