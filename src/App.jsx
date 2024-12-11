import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root.jsx';
import BlogItem from './routes/BlogItem.jsx';
import Careers from './routes/Careers.jsx';
import WorkingWithUs from './routes/WorkingWithUs.jsx';
import Billing from './routes/Billing.jsx';
import DruidXp from './routes/DruidXp.jsx';
import DruidProjectList from './routes/projects/ProjectList.jsx';
import DruidProjectCase from './routes/projects/Project.jsx';
import ServicesContent from './routes/services/ServicesContent.jsx';
import ServicesList from './routes/services/ServicesList.jsx';
import Maintenance from './routes/Maintenance.jsx';
import Consultation from './routes/Consultation.jsx';
import EmployeesPost from './routes/people/Employees.jsx';
import Employees from './routes/people/EmployeesPost.jsx';
import MauticForm from './routes/contact/ContactUs.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <DruidProjectList />, index: true },
        { path: 'projects', element: <DruidProjectList /> },
        { path: 'case/:id', element: <DruidProjectCase /> },
        { path: 'blog', element: <BlogItem /> },
        { path: 'services', element: <ServicesList /> },
        { path: 'services/:id', element: <ServicesContent /> },
        { path: 'service/:id', element: <ServicesContent /> },
        { path: 'careers', element: <Careers /> },
        { path: 'vacancies', element: <WorkingWithUs /> },
        { path: 'employees', element: <EmployeesPost /> },
        { path: 'employees/:id', element: <Employees /> },
        { path: 'billing', element: <Billing /> },
        { path: 'druid-xp', element: <DruidXp /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'consultation', element: <Consultation /> },
        { path: 'mautic', element: <MauticForm /> },
      ],
    },
  ]);


  return <RouterProvider router={router} />;
}

export default App;
