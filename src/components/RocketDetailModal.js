import React from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import moment from "moment";
function RocketDetailModal(props) {
  const { item } = props;
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item.rocket.rocket_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Mission: {item.mission_name}</h4>
        <h6 className="my-4 mx-2">Details: {item.details}</h6>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <h6>
              Launch Success:{" "}
              {item.launch_success ? (
                <span className="text-success">success</span>
              ) : (
                <span className="text-danger">failure</span>
              )}
            </h6>

            {item.launch_failure_details ? (
              <p className="text-danger">
                Reason: {item.launch_failure_details.reason}
              </p>
            ) : (
              ""
            )}
          </ListGroup.Item>

          <h5 className="mx-3 my-3">Launch Details</h5>
          <ListGroup.Item>Site: {item.launch_site.site_name}</ListGroup.Item>
          <ListGroup.Item>
            Date: {moment(item.launch_date_local).format("MMM Do YY")}
          </ListGroup.Item>
          <ListGroup.Item>
            Time: {moment(item.launch_date_local).format("h:mm:ss a")}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RocketDetailModal;
