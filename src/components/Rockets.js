import React from "react";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import notFound from "../images/NotFound.jpg";
import RocketDetailModal from "./RocketDetailModal";
function Rockets({ item }) {
  //to display modal
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Card style={{ width: "18rem" }} data-testid="card">
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
        <Card.Title className="bg-dark text-white p-2" data-testid="title">
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
              {item.upcoming ? <span> Yes</span> : <span> No</span>}
            </span>
          </p>
          <p>
            <span className="">
              Launch Year: {moment(item.launch_date_local).format("MMM Do YY")}
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
        <Button
          className="bg-dark text-white"
          onClick={() => setModalShow(true)}
        >
          Get Details
        </Button>

        <RocketDetailModal
          item={item}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card.Body>
    </Card>
  );
}

export default Rockets;
