import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import Paginate from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { fetchRockets } from "../features/rockets/getRockets/rocketActions";
import notFound from "../images/NotFound.jpg";
import moment from "moment";

function Home() {
  const rocketlist = useSelector((state) => state.getRocket);
  const { loading, error, searchResults, filteredResults } = rocketlist;

  //displaydata

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());

    setPageLoading(false);
  }, [dispatch, fetchRockets]);

  //pagnation

  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
        <Loader />
      ) : (
        <Row>
          <Col md={3} className="my-5">
            <FilterSidebar />
          </Col>
          <Col md={9}>
            <SearchBar rocketlist={rocketlist.rockets} />
            <div className="d-flex flex-wrap gap-4">
              {currentPosts.map((item, keys) => {
                return (
                  <Card style={{ width: "18rem" }} key={keys}>
                    <Card.Img
                      variant="top"
                      className="thumbnail"
                      width="auto"
                      height="300px"
                      src={
                        item.links.mission_patch_small
                          ? item.links.mission_patch_small
                          : notFound
                      }
                    />
                    <Card.Body>
                      <Card.Title className="bg-dark text-white p-2">
                        {item.rocket.rocket_name}
                      </Card.Title>
                      <div>
                        <p className="fw-bolder">
                          <span className="">Mission: {item.mission_name}</span>
                        </p>
                        <p className="fw-light">
                          <span>
                            {" "}
                            Upcoming:
                            {item.upcoming ? (
                              <span> Yes</span>
                            ) : (
                              <span> No</span>
                            )}
                          </span>
                        </p>
                        <p>
                          <span className="">
                            Launch Year:{" "}
                            {moment(item.launch_date_local).format("MMM Do YY")}
                          </span>
                        </p>
                        <p>
                          <span className="">
                            Launch Status:{" "}
                            {item.launch_success === null
                              ? "Unknown"
                              : item.launch_success
                              ? "Success"
                              : "Failure"}
                          </span>
                        </p>
                      </div>
                      <Button variant="primary">Get Details</Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
            <Paginate
              postsPerPage={postsPerPage}
              totalPosts={searchResults.length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;
