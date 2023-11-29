import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import ReactionForm from "../components/ReactionForm";
import CommentList from "../components/CommentList";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

export default function Home() {
  const [apodData, setApodData] = useState([]);
  const [selectedApod, setSelectedApod] = useState(null);
  const [loadDate, setLoadDate] = useState(new Date());
  const apiKey = "5bPcUbrxdbPSFRmYDJch0sGZzieD2Y7XSGWezhbI"; // Your NASA API key

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
    for (let i = 1; i <= n; i++) {
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
    <div className="page-content">
      <div className="gallery">
        {apodData.map((apod, index) => (
          <div key={index} className="item">
            {apod && <img src={apod.url} alt={apod.title} />}
            <div className="flex w-full bg-slate-400 py-2">
              <ReactionForm data={apod}/>
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
            {Auth.loggedIn() ? (
              <>
                <CommentList photoId={apod?.date} />
              </>
            ) : (
              <Link
                to="/login"
                className="flex w-1/8 justify-center p-2"
              >
                <FaComments className="text-blue-600 text-2xl"/>
              </Link>
            )}
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
    </div>
  );
}
