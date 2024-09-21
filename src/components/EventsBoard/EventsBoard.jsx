import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import css from "./EventsBoard.module.css";

export const EventsBoard = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("title");
  const eventsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events?page=${currentPage}&limit=${eventsPerPage}&sortField=${sortField}`
        );
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [currentPage, sortField]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRegisterClick = (eventId) => {
    navigate(`/register/${eventId}`);
  };

  const handleViewClick = (eventId) => {
    navigate(`/participants/${eventId}`);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Events</h2>

      <div className={css.selectContainer}>
        <select
          className={css.select}
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="eventDate">Event date</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>

      <div className={css.eventsGrid}>
        {events.map((event) => (
          <div key={event._id} className={css.eventCard}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.organizer}</p>
            <div className={css.box}>
              <button
                className={css.linkButton}
                onClick={() => handleRegisterClick(event._id)}
              >
                Register
              </button>
              <button
                className={css.linkButton}
                onClick={() => handleViewClick(event._id)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={css.pagination}>
        <button
          className={css.arrow}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={index + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={css.arrow}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
