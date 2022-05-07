import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function Paginate({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(currentPage, pageNumbers);
  return (
    <>
      <nav className="mt-3 ">
        <ul className="pagination justify-content-center">
          <li>
            <Button
              className="page-item bg-dark text-white"
              onClick={() => prevPage()}
              disabled={currentPage <= 1 ? true : false}
            >
              previous
            </Button>
          </li>

          <ButtonGroup aria-label="Basic example">
            {pageNumbers.map((num) => (
              <Button key={num} onClick={() => paginate(num)}>
                {num}
              </Button>
            ))}
          </ButtonGroup>
          <li>
            <Button
              className="page-item bg-dark text-white"
              disabled={currentPage >= pageNumbers.length - 1 ? true : false}
              onClick={() => nextPage()}
            >
              next
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Paginate;
