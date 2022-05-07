import React, { useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchRockets } from "../features/rockets/getRockets/rocketActions";

function Home() {
  const rocketlist = useSelector((state) => state.getRocket);
  const { loading, error, rockets } = rocketlist;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <>
      {error ? (
        "error"
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={3}>Filters</Col>
            <Col md={9}>
              <div className="d-flex flex-wrap gap-4">
                {rockets.map((item, keys) => {
                  return (
                    <Card style={{ width: "18rem" }} key={keys}>
                      <Card.Img
                        variant="top"
                        src={item.links.mission_patch_small}
                      />
                      <Card.Body>
                        <Card.Title className="bg-dark text-white p-2">
                          {item.rocket.rocket_name}
                        </Card.Title>
                        <div>
                          <p className="fw-bolder">
                            <span className="">
                              Mission: {item.mission_name}
                            </span>
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
                              Launch Year: {item.launch_year}
                            </span>
                          </p>
                        </div>
                        <Button variant="primary">Get Details</Button>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Home;
