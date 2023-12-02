const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <ul className="pagination">
      {[...Array(totalPages).keys()].map((page) => (
        <li
          key={page + 1}
          onClick={() => handlePageClick(page + 1)}
          className={currentPage === page + 1 ? "active" : ""}
        >
          {page + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
