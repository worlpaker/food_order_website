import React from 'react';
import './css/main.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

// order history by user's profile
export function Orderhistory() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let crsf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");  // eslint-disable-line     
      setLoading(true);
      await axios('/api/orderhistory/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRFToken': crsf_token }
      })
        .then(res => ((setData(res.data), setStatus('200'))))
        .catch(err => ((console.log(err), setStatus('400'))));
      setLoading(false);
    };

    fetchData();
  }, []); // eslint-disable-line



  return (
    <>
      <div className='under-nav'>
        {loading && <> <br></br><div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
          </div>
        </div> <h1 align='center'> Loading...</h1> </>}
        {!loading && status === '200' && (<>

          <div className='orderhistory-header'>Order History</div>

          <div>
            <Table className='orderhistory-table' >
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Food</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              {data.map(foods =>
                <>
                  <tbody>
                    <tr>
                      <td>{foods.food_restaurant_str}</td>
                      <td>{foods.food_name_str}</td>
                      <td>{(foods.food_price * foods.quantity).toFixed(2)}$</td>
                      <td>{foods.created_date.replace("T", "|").replace("+0000", "")}</td>
                      <td>{foods.status}</td>
                    </tr>
                  </tbody>

                </>
              )}
            </Table>


          </div>
        </>)}
        {status === '400' && <> <br></br> <div class="d-flex justify-content-center"><div class="spinner-grow" role="status">
        </div> </div><br></br><h1 align='center'>Error.. Please try again..</h1> </>}
      </div>
    </>

  );
}