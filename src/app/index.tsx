import MainPage from "./frontend/components/mainPage";
import SchedulingScreen from "./frontend/screen/scheduling";
import QueueScreen from "./frontend/screen/queueing";


export default function Page() {
  return <QueueScreen queueInfo={{
    date: "2026-01-30",
    queueNumber: 5,
    appointmentTime: "14:30"
  }} />;
}