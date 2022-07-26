import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './css/main.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//get restaurants food from backend
//save orders to local storage
//finally, submit orders to backend

function Restaurantsfood() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const location = useLocation();
  let [count, setCount] = useState(0); // eslint-disable-line 
  const navigate = useNavigate();

  const Save_order = (items) => {

    const local_orderdata = {
      id: items.id,
      name: items.food_name,
      restaurant: items.food_restaurant,
      restaurant_id: location.state.restaurants.id,
      quantity: items.quantity,
      price: items.price
    };


    const array = JSON.parse(localStorage.getItem('order')) || [];

    // add to it, only if it's empty
    const order_item = array.find(item => item.id === local_orderdata.id);

    (order_item ? order_item.quantity = local_orderdata.quantity : array.push(local_orderdata));

    localStorage.setItem('order', JSON.stringify(array));
  };



  //get data from localstorage and submit it to backend
  const handleSubmit = () => {
    let final_data = {
      food_restaurant_order: [],
      food_name_order: [],
      quantity: [],
      price: [],
    };
    const order_array = JSON.parse(localStorage.getItem('order'));

    order_array.map((item => ((
      final_data.food_restaurant_order.push(item.restaurant_id),
      final_data.food_name_order.push(item.id),
      final_data.quantity.push(item.quantity),
      final_data.price.push(item.price)
    ))));

    const handleSucces = (res) => {
      (res.status === 200 &&
        navigate('/order')
      );
    };

    const handleError = (error) => {
      localStorage.removeItem('order');
      console.log(error);
      alert("Someting went wrong, Please try again.");
    };


    let crsf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");  // eslint-disable-line     
    axios('/api/createorder/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-CSRFToken': crsf_token },
      data: final_data
    })
      .then(res => handleSucces(res))
      .catch(err => handleError(err));
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('/api/rest_and_food/?search=' + location.state.restaurants.name)
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
        {!loading && status === '200' && (
          <div>        <br></br>
            <h1 align='center'> {location.state.restaurants.name} <br></br>
            </h1>
            {data.map((restaurants) =>
              <>
                <div className='flex-parent'>
                  <div className='restaurants-box'>
                    <a className='restaurants-name' href='/Restaurants_food' ><div>
                      <img alt='Food' src={restaurants.food_image.replace("backend", "localhost")} className='food-images' />
                    </div>
                      {restaurants.food_name}</a>

                    <div className='restaurants-cuisines-name'> Price: {restaurants.quantity <= 0 ? restaurants.price : (restaurants.price * restaurants.quantity).toFixed(2)}$</div>
                    <div className='food-flex'><Button className='food-plus-button' onClick={() => ((setCount(restaurants.quantity += 1), Save_order(restaurants)))}>+</Button>
                      <div className='food-count'> Quantity = {restaurants.quantity} </div>
                      <Button className='food-negative-button' onClick={() => setCount(restaurants.quantity < 1 ? (restaurants.quantity = 0) : (restaurants.quantity -= 1))}>-</Button> </div>
                  </div>
                </div>
              </>
            )}
            <div className='food-submit-button-container'> <Button className='food-submit-button' onClick={() => handleSubmit()} >ORDER</Button> </div>
          </div>
        )}
        {status === '400' && <> <br></br> <div class="d-flex justify-content-center"><div class="spinner-grow" role="status">
        </div> </div><br></br><h1 align='center'>Error.. Please try again..</h1> </>}
      </div>
    </>
  );
}
export default Restaurantsfood;