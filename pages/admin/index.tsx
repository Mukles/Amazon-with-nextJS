import StaticCard from '../../src/Admin/StaticCard';
import SocialTraffic from '../../src/Admin/SocialTraffic'
import RecentActivites from '../../src/Admin/RecentActivites';
import TaskSummeries from '../../src/Admin/TaskSummeries';
import ClientTable from '../../src/Admin/ClientTable';
import ContactForm from '../../src/Admin/ContactForm';
import ExResoures from '../../src/Admin/ExResoures';
import { Admistator } from '../../src/Layout/admistatorLayout';
function Team() {
  return (
    <>
      <StaticCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <SocialTraffic />
        <RecentActivites />
      </div>
      <TaskSummeries />
      <ClientTable />
      <ContactForm />
      <ExResoures />
    </>
  )
}

Team.Layout = Admistator;
export default Team;