import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import Paginate from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { fetchRockets } from "../features/rockets/getRockets/rocketActions";
import Rockets from "../components/Rockets";

function Home() {
  const rocketlist = useSelector((state) => state.getRocket);
  const { loading, error, searchResults } = rocketlist;

  //displaydata

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());

    setPageLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchRockets]);

  //pagnation

  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(8);

  //total posts = 100
  const indexOfLastPost = currentPage * postsPerPage; // 10 20
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 0 10
  // (0,10) (10,20)

  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (num) => {
    setCurrentPage(num);
  };
  const nextPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const prevPage = () => {
    setCurrentPage(currentPage + 1);
  };

  let time = new Date();

  console.log(time);
  return (
    <>
      {error ? (
        <Error msg={error} />
      ) : loading || pageLoading ? (
        <div data-testid="loading">
          <Loader />
        </div>
      ) : (
        <Row>
          <Col md={2} className="my-5">
            <FilterSidebar />
          </Col>
          <Col md={9}>
            <SearchBar rocketlist={rocketlist.rockets} />
            <div className="d-flex flex-wrap gap-4 justify-content-around align-items-center">
              {currentPosts.map((item, keys) => {
                return (
                  <div key={keys} data-testid="list">
                    <Rockets item={item} />
                  </div>
                );
              })}
              <Paginate
                postsPerPage={postsPerPage}
                totalPosts={searchResults.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;
