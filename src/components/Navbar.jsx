import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.jpg'
import search from '../assets/search.png'
import location from '../assets/location.png'

const Navbar = ({ onCitySearch, onLocationFetch }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if(searchQuery) {
            onCitySearch(searchQuery)
            setSearchQuery('')
        }
    }

    const handleLocationClick = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos) => {

                const { latitude, longitude } = pos.coords
                onLocationFetch(latitude, longitude)
                setSearchQuery("")
            
            }, (error) => {
                console.log(error)
                toast.error("Geolocation is not supported by your browser.")
            })
        }
    }

  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        {/* logo */}
        <img src={logo} alt="logo" className="w-20 h-15 select-none" />
        {/* search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full max-w-[700px] bg-white rounded-lg shadow-md"
        >
          <img
            src={search}
            alt="search"
            className="left-3 w-4 h-4 text-gray-400 select-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQuery}
            placeholder="search for you city...."
            className=" w-full py-2 pl-10 text-sm text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none"
          />
          <button type="submit" className="bg-[#050e1fde] text-white px-5 py-2">
            Search
          </button>
        </form>
        <div
          onClick={handleLocationClick}
          className="flex items-center gap-3 px-4 text-sm font-medium text-white rounded cursor-pointer"
        >
          <img src={location} alt="location" className="h-10" />
          <p>Current Location</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar