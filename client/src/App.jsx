import React, { useState, useEffect } from "react";
import "./App.css";

import ReactionForm from "./components/ReactionForm";
import CommentList from "./components/CommentList";
import { FaMagnifyingGlass } from "react-icons/fa6";


const App = () => {
  const [apodData, setApodData] = useState([]);
  const [selectedApod, setSelectedApod] = useState(null);
  const [loadDate, setLoadDate] = useState(new Date());
  const apiKey = "5bPcUbrxdbPSFRmYDJch0sGZzieD2Y7XSGWezhbI"; // Your NASA API key

  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    const fetchApodData = async (date) => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching APOD:", error);
        return null;
      }
    };

    const loadApodData = async (startDate) => {
      const dates = getLastNDates(startDate, 5);
      const newApodData = await Promise.all(
        dates.map((date) => fetchApodData(date))
      );
      setApodData((apodData) => [
        ...apodData,
        ...newApodData.filter((item) => item),
      ]);
    };

    loadApodData(loadDate);
  }, [loadDate, apiKey]);

  const getLastNDates = (startDate, n) => {
    const dates = [];
    for (let i = 0; i < n; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const openPopup = (apod) => {
    setSelectedApod(apod);
  };

  const closePopup = () => {
    setSelectedApod(null);
  };

  const handleShowMore = () => {
    const newLoadDate = new Date(loadDate);
    newLoadDate.setDate(newLoadDate.getDate() - 5);
    setLoadDate(newLoadDate);
  };



  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">Space Blog</div>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      <div className="gallery">
        {apodData.map((apod, index) => (
          <div key={index} className="item">
            {apod && <img src={apod.url} alt={apod.title} />}
            <div className="flex w-full bg-slate-400 py-2">
              <ReactionForm />
              <div className="flex w-1/2 p-2 text-white mr-2 justify-end">
                <FaMagnifyingGlass
                  className="text-2xl"
                  onClick={() => openPopup(apod)}
                />
              </div>
            </div>
            <div className="caption">
              <h3>{apod?.title}</h3>
              <p>{apod?.date}</p>
              <p className="explanation">{apod?.explanation}</p>
            </div>
            <CommentList />
          </div>
        ))}
      </div>

      {selectedApod && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <img src={selectedApod.url} alt={selectedApod.title} />
            <div className="popup-caption">
              <h3>{selectedApod.title}</h3>
              <p>{selectedApod.date}</p>
              <p>{selectedApod.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <button className="show-more-btn" onClick={handleShowMore}>
        Show More
      </button>
    </>
  );
};

export default App;
