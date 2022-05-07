import React, { useEffect } from "react";
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
          <h1>Hello</h1>
        </>
      )}
    </>
  );
}

export default Home;
