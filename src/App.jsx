import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EventsBoard } from "./components/EventsBoard/EventsBoard";
import { RegistrationPage } from "./components/RegistrationPage/RegistrationPage";
import { ParticipantsPage } from "./components/ParticipantsPage/ParticipantsPage";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsBoard />} />
        <Route path="/register/:eventId" element={<RegistrationPage />} />
        <Route path="/participants/:eventId" element={<ParticipantsPage />} />
      </Routes>
    </Router>
  );
}
