import { useState } from "react";
import Navbar from "./components/Navbar";
import CityAndTime from "./components/CityAndTime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const handleCitySearch = (city) => {
    setCityName(city);
    setLat(null); // Reset lat/lon if new city searched
    setLon(null);
  };

  const handleLocationFetch = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
    setCityName(""); // Clear city name if using geolocation
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer />
      <Navbar onCitySearch={handleCitySearch} onLocationFetch={handleLocationFetch} />
      <CityAndTime
        cityName={cityName}
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
      />
    </div>
  );
};

export default App;
