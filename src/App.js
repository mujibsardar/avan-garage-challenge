import {useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [garages, setGarages] = useState([]);
  const [location, setLocation] = useState('Los Angeles');

  const handleChange = event => {
    setLocation(event.target.value);
  }

  useEffect(() => {
    axios.get(`http://localhost:9000/${location}`)
      .then(response => {
        console.log(response);
        setGarages(response.data);
      })
      .catch(error => console.log(error));
  }, [location])

  return (
    <>
      <input type="text" value={location} onChange={handleChange} />
      <div>
        {garages.map((garage, index) => (
          <div key={index}>
            <img src={garage.image_url} width="200" height="200"/>
            <p>Address: {garage.location.display_address}</p>
            <p>Yelp Rating: {garage.rating}</p>
            <p>Yelp Review Count: {garage.review_count}</p>
            <p>Quality Score: {garage.score}</p>
            <a href={garage.url}>Yelp Link</a>
          </div>
        ))}

      </div>
    </>
  );
}

export default App;
