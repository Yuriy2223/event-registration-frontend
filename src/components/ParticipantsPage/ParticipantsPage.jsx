import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import css from "./ParticipantsPage.module.css";

export const ParticipantsPage = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5000/api/events/${eventId}/participants?search=${searchTerm}`
          `https://event-registration-backend-qbi2.onrender.com/api/events/${eventId}/participants?search=${searchTerm}`
        );
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${eventId}`
        );
        const eventData = await response.json();
        setEventTitle(eventData.title);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchParticipants();
    fetchEventData();
  }, [eventId, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h1 className={css.title}>{`"${eventTitle}" participants`}</h1>
        <input
          className={css.input}
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className={css.goBack} onClick={handleGoBack}>
          Go back
        </button>
        <div className={css.participantsGrid}>
          {participants.map((participant) => (
            <div key={participant._id} className={css.participantCard}>
              <p className={css.participantName}>{participant.fullName}</p>
              <p className={css.participantEmail}>{participant.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
