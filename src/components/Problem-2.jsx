import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch contacts from API based on showModalA and showModalB states
    const fetchContacts = async () => {
      let url;
      if (showModalA) {
        url = "https://contact.mediusware.com/api/contacts/";
      } else if (showModalB) {
        url =
          "https://contact.mediusware.com/api/country-contacts/United%20States/";
      }

      if (url) {
        const response = await fetch(url);
        const data = await response.json();
        setModalContent(data);
      }
    };

    fetchContacts();
  }, [showModalA, showModalB]);

  //handling opening functionality of the modal
  const handleAShowModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    // Update URL
    window.history.pushState({}, "", "/modal-a");
  };
  const handleAShowModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    // Update URL
    window.history.pushState({}, "", "/modal-b");
  };
  const handleModalCOpen = () => {
    setShowModalC(true);
  };

//handling modal close
  const handleModalClose = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

//Not implemented for time shortage
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

//Not implemented for time shortage
  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  //implementing infinite scroll
  //Not implemented for time shortage
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleAShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleAShowModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        {showModalA && (
          <Modal show={showModalA} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal A - All Countries Contacts</Modal.Title>

              {/* <div className="col-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                <div className="col-auto">
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      className="form-control"
                      checked={onlyEven}
                      onChange={handleCheckboxChange}
                    />
                    Only Even
                  </label>
                </div>
              </div> */}
            </Modal.Header>
            <Modal.Body>
              <Button
                variant="primary"
                style={{ backgroundColor: "#46139f", marginRight: 10 }}
                onClick={handleAShowModalA}
              >
                All Contacts
              </Button>

              <Button
                variant="primary"
                style={{ backgroundColor: "#ff7f50", marginRight: 10 }}
                onClick={handleAShowModalB}
              >
                Us Contacts
              </Button>

              <Button
                variant="secondary"
                style={{ backgroundColor: "#46139f", marginRight: 10 }}
                onClick={handleModalClose}
              >
                Close
              </Button>

              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {modalContent &&
                    modalContent?.results.map((contact) => (
                      <tr>
                        <td>{contact.id}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.country?.name}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        )}

        {/* Modal B */}
        {showModalB && (
          <Modal show={showModalB} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal B - Contacts of US</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button
                variant="primary"
                style={{ backgroundColor: "#46139f", marginRight: 10 }}
                onClick={handleAShowModalA}
              >
                All Contacts
              </Button>
              <Button
                variant="primary"
                style={{ backgroundColor: "#ff7f50", marginRight: 10 }}
                onClick={handleAShowModalB}
              >
                Us Contacts
              </Button>

              <Button
                variant="secondary"
                style={{ backgroundColor: "#46139f", marginRight: 10 }}
                onClick={handleModalClose}
              >
                Close
              </Button>

              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {modalContent &&
                    modalContent?.results?.map((contact) => (
                      <tr onClick={handleModalCOpen}>
                        <td>{contact.id}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.country?.name}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        )}

        {/* modal C*/}
        {showModalC && (
          <Modal show={showModalB} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal C</Modal.Title>
            </Modal.Header>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Problem2;
