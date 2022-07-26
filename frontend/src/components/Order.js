import React from 'react';
import './css/main.css';
import { Table } from 'react-bootstrap';
import jwt_decode from "jwt-decode";


//if order successfully created, show this page.
export function Order() {
  const user_details = jwt_decode(localStorage.getItem("access"));
  const order_array = JSON.parse(localStorage.getItem('order'));
  localStorage.removeItem('order');
  let total = 0;

  return (
    <>
      {order_array && (
        <>
          <div className='under-nav'><br></br> <h1 align="center">Your Order Successfully Created </h1></div>
          <br></br>
          <div align="center"> <h1>Food Details</h1></div>
          <Table className='orderhistory-table'>
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Price $</th>
                <th>Total $</th>
              </tr>
            </thead>
            {order_array.map((item => ((
              <tbody>
                <td>{item.restaurant}</td>
                <td>{item.name}</td>
                <td> &nbsp;&nbsp;&nbsp;&nbsp; {item.quantity}</td>
                <td>{item.price}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <div className='orderlist-hidetotal'>{total += (item.price * item.quantity)}</div>
              </tbody>

            ))))
            }


          </Table>

          <div className='orderlist-total'>Total:   <div>&nbsp;&nbsp;{total.toFixed(2)} $ </div></div>

          <Table className='orderhistory-table'>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <td>{user_details.first_name}</td>
              <td>{user_details.email}</td>
              <td>{user_details.Home_address} - {user_details.City} - {user_details.Country}</td>
            </tbody>
          </Table>
        </>

      )}

      {!order_array && (
        <>

          <div className="under-nav"> <br></br><h1 align="center">ERROR: Your order already created.<br></br> <br></br> Please check your order history.</h1></div>
        </>
      )}

    </>);
}

