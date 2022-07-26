import React, { useEffect, useState } from "react";
import { CheckToken } from "./Checktoken";
import axios from 'axios';
import './css/main.css';
import { Alert, Button, Table } from 'react-bootstrap';

// Basic Admin panel - get data from sql
// Show users, restaurants and all orders.

export const Adminpanel = () => {
  const [users, setUsers] = useState(false);
  const [user_data, setUser_data] = useState([]);
  const [orders, setOrders] = useState(false);
  const [orders_data, setOrders_data] = useState([]);
  const [rest, setRest] = useState(false);
  const [rest_data, setRest_data] = useState([]);

  useEffect(() => {
    CheckToken();
  }, []);

  const get_users = async () => {
    await axios
      .get('api/admin_users/')
      .then(res => ((setUsers(true), setUser_data(res))))
      .catch(err => handleError(err));
  };
  const get_restaurants = async () => {
    await axios
      .get('api/admin_restaurants/')
      .then(res => ((setRest(true), setRest_data(res))))
      .catch(err => handleError(err));
  };

  const get_orders = async () => {
    await axios
      .get('api/admin_orders/')
      .then(res => ((setOrders(true), setOrders_data(res))))
      .catch(err => handleError(err));
  };

  const handleError = (err) => {
    Alert("You don't have authorization.");
    window.location.href = "/";
  };

  return (
    <>
      <div class="under-nav"><br></br>
        <h1 align="center">Welcome to Admin Panel
          <br></br>
          <Button onClick={() => ((get_users(), setOrders(false), setRest(false)))}> Show Users </Button> &nbsp;&nbsp;&nbsp;
          <Button onClick={() => ((get_orders(), setUsers(false), setRest(false)))}> Show Orders </Button> &nbsp;&nbsp;&nbsp;
          <Button onClick={() => ((get_restaurants(), setUsers(false), setOrders(false)))}> Show Restaurants</Button>
        </h1>
      </div>
      {users && <>
        <Table className='orderhistory-table' >
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>

          {user_data.data.map(item =>
            <>

              <tbody>
                <tr>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.country}</td>
                </tr>
              </tbody>

            </>

          )}
        </Table>
      </>
      }

      {rest && <>

        <Table className='orderhistory-table' >
          <thead>
            <tr>
              <th>Restaurant ID</th>
              <th>Restaurant Name</th>
              <th>Category ID</th>
              <th>Address</th>
            </tr>
          </thead>

          {rest_data.data.map(item =>
            <>

              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category_id}</td>
                  <td>{item.address}</td>
                </tr>
              </tbody>

            </>

          )}
        </Table>

      </>}

      {orders && <>
        <Table className='orderhistory-table' >
          <thead>
            <tr>
              <th>Date</th>
              <th>Food Name ID </th>
              <th>Restaurant ID</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Order ID</th>
            </tr>
          </thead>

          {orders_data.data.map(item =>
            <>

              <tbody>
                <tr>
                  <td>{item.date}</td>
                  <td>{item.food_name_id}</td>
                  <td>{item.rest_id}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>
                  <td>{item.user_id}</td>
                  <td>{item.order_id}</td>

                </tr>
              </tbody>

            </>

          )}
        </Table>
      </>
      }

    </>
  );

};