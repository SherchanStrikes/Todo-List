import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


const List = () => {
  const [items, setItems] = useState("");
  const [arrItem, setArrItem] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const addItems = () => {
    if (!items) {
      alert('Please write something.')
    }else if(items && !toggleBtn) {
      setArrItem(arrItem.map((item) => {
        if(item.id === isEditItem) {
          return {...item, name: items}
        }
        return item;
      }))
      setItems('');
      setToggleBtn(!toggleBtn);
    
    } else {
      const inputedItems = {id: new Date().getTime().toString(), name: items}
      console.log(inputedItems);
      setArrItem([...arrItem, inputedItems]);
      setItems("");
    }
  };
  const editItem = (index) => {
    let newEditItem = arrItem.find((item) => {
      return item.id === index;
    })
    console.log(newEditItem);
    setToggleBtn(!toggleBtn);
    setItems(newEditItem.name);
    setIsEditItem(index);
  }
  
  const deleteItem = (index) => {
    const updatedArr = arrItem.filter((item) => {
      return item.id !== index;
    });
    setArrItem(updatedArr);
  };
  const removeAll = () => {
    setArrItem([]);
  };
  return (
    <Container fluid>
      <Row className="mt-5">
        <Col
          className="d-flex mt-5 justify-content-center text-white p-2"
          style={{ fontSize: "4rem" }}
        >
          📋
        </Col>
      </Row>
      <Row>
        <Col
          className="d-flex justify-content-center text-white "
          style={{ fontSize: "1.4rem" }}
        >
          Add Your List Here ✍️
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="input-group d-flex align-items-center mt-3 w-50">
            <input
              type="text"
              className="form-control text-dark"
              placeholder="Todo Item"
              aria-label="Todo Item"
              aria-describedby="basic-addon2"
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
            {toggleBtn ? (<i
              className="fa fa-plus fa-xl ps-2 text-success"
              style={{ cursor: "pointer" }}
              onClick={addItems}
              title="Add Item"
            ></i>) : (<i
              className="fa fa-solid fa-pen-to-square fa-xl ps-2 text-success"
              style={{ cursor: "pointer" }}
              onClick={addItems}
              title="Update Item"
            ></i>)}
            
          </div>
        </Col>
      </Row>
      {arrItem.map((item) => (
        <Row key={item.id}>
          <Col className="d-flex justify-content-center">
            <div
              className="input-group d-flex  align-items-center mt-3 w-50"
              
            >
              <input
                type="text"
                className="form-control bg-primary border-0 text-white"
                aria-label="Todo Item"
                aria-describedby="basic-addon2"
                value={item.name}
                disabled={true}
              />
              <i
                className="fa fa-solid fa-pen-to-square fa-xl ps-2 text-warning"
                style={{ cursor: "pointer" }}
                onClick={() =>editItem(item.id)}
                title="Edit item"
              ></i>

              <i
                className="fa fa-trash fa-xl ps-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => deleteItem(item.id)}
                title="Remove item"
              ></i>
            </div>
          </Col>
        </Row>
      ))}
      {arrItem.length > 0 ? (
        <Row>
          <Col className="d-flex justify-content-center">
            <button
              className="btn btn-danger mt-3 text-black"
              style={{ cursor: "pointer", fontWeight: 500 }}
              onClick={removeAll}
            >
              Clear All Items
            </button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default List;
