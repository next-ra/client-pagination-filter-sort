import styles from './Pagination.module.css';

const Pagination = ({ itemsPerPage, totalItems, onPaginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((num) => (
        <li
          className={num === currentPage ? `${styles[`current-page`]}` : ''}
          onClick={() => onPaginate(num)}
          key={num}
        >
          {num}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
