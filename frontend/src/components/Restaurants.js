import axios from 'axios';
import './css/main.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//get restaurants from backend

function Restaurants() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  const handleClick = (item) => {

    navigate('/Restaurants_food', { state: { restaurants: item } });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('api/restaurants/')
        .then(res => ((setData(res.data), setStatus('200'))))
        .catch(err => ((console.log(err), setStatus('400'))));
      setLoading(false);
    };

    fetchData();
  }, []);



  return (

    <div className='under-nav'>
      {loading && <> <br></br><div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div> <h1 align='center'> Loading...</h1> </>}
      {!loading && status === '200' && (
        <div>
          <br></br>
          <h1 align='center'>Restaurants <br></br>
          </h1>

          {data.map(restaurants =>
            <div className='flex-parent'>
              <div className='restaurants-box'>
                <a className='restaurants-name' href='/Restaurants_food' onClick={() => handleClick(restaurants)}><div>
                  <img alt='Restaurant' src={restaurants.restaurant_image.replace("backend", "localhost")} className='restaurants-images' /></div>
                  {restaurants.name}</a>
                <div className='restaurants-cuisines-name'>{restaurants.category_name}</div>
                <div className='restaurants-cuisines-address'>{restaurants.res_adress}</div>
                <div className='restaurants-id'>{restaurants.id}</div>
              </div>
            </div>

          )}

        </div>

      )}

      {status === '400' && <> <br></br> <div class="d-flex justify-content-center"><div class="spinner-grow" role="status">
      </div> </div><br></br><h1 align='center'>Error.. Please try again..</h1> </>}

    </div>


  );


}

export default Restaurants;