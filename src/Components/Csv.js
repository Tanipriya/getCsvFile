import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Row, Col, Form } from 'react-bootstrap';
import data from '../data.csv'

const Csv = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState('');
    const [poNumber, setPoNumber] = useState('');
    const [poDescription, setPoDescription] = useState('');
  console.log(data)

    useEffect(() => {
      // Load supplier data from CSV file
      Papa.parse('/data.csv/supplier.csv', {
        
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const uniqueSuppliers = Array.from(new Set(result.data.map((row) => row.Supplier)));
          setSuppliers(uniqueSuppliers);
        },
      });
    }, []);
  
   const handleSupplierChange = (event) => {
  const supplier = event.target.value;
  setSelectedSupplier(supplier);
  setSelectedPurchaseOrder('');
  setPoNumber('');
  setPoDescription('');

  // Load purchase orders based on the selected supplier from the "data.csv" folder
  Papa.parse(`/data.csv/purchaseOrders_${supplier}.csv`, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (result) => {
      const uniquePurchaseOrders = Array.from(new Set(result.data.map((row) => row.PurchaseOrder)));
        setPurchaseOrders(uniquePurchaseOrders);
    },
  });
};
    const handlePurchaseOrderChange = (event) => {
      const purchaseOrder = event.target.value;
      setSelectedPurchaseOrder(purchaseOrder);
  
      // You can fetch PO number and description based on the selected supplier and purchase order here
      // For simplicity, you can load this data from a CSV file or another data source
      // Update the state variables: poNumber and poDescription
    };

  return (
<>
<Container>
      <Row>
        <Col>
          <h1>Enter Information</h1>
          <Form>
            <Form.Group controlId="supplierDropdown">
              <Form.Label>6. Supplier:</Form.Label>
              <Form.Control as="select" onChange={handleSupplierChange} value={selectedSupplier}>
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="purchaseOrderDropdown">
              <Form.Label>7. Purchase Order:</Form.Label>
              <Form.Control as="select" onChange={handlePurchaseOrderChange} value={selectedPurchaseOrder}>
                <option value="">Select Purchase Order</option>
                {purchaseOrders.map((purchaseOrder) => (
                  <option key={purchaseOrder} value={purchaseOrder}>
                    {purchaseOrder}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="poNumber">
              <Form.Label>PO Number:</Form.Label>
              <Form.Control type="text" value={poNumber} readOnly />
            </Form.Group>
            <Form.Group controlId="poDescription">
              <Form.Label>PO Description:</Form.Label>
              <Form.Control type="text" value={poDescription} readOnly />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>

</>

  )
}

export default Csv