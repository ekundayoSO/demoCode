import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root.jsx';
import BlogItem from './routes/BlogItem.jsx';
import Careers from './routes/Careers.jsx';
import WorkingWithUs from './routes/WorkingWithUs.jsx';
import MeetTheDruids from './routes/MeetTheDruidss.jsx';
import Billing from './components/Billing.jsx';
import DruidXp from './routes/DruidXp.jsx';
import DruidProjectList from './routes/projects/ProjectList.jsx';
import DruidProjectCase from './routes/projects/Project.jsx';
import ServicesContent from './routes/services/ServicesContent.jsx';
import ServicesList from './routes/services/ServicesList.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <DruidProjectList /> },
        { path: 'case/:id', element: <DruidProjectCase /> },
        { path: 'blog', element: <BlogItem /> },
        { path: 'services', element: <ServicesList /> },
        { path: 'service/:id', element: <ServicesContent /> },
        { path: 'careers', element: <Careers /> },
        { path: 'vacancies', element: <WorkingWithUs /> },
        { path: 'people', element: <MeetTheDruids /> },
        { path: 'billing', element: <Billing /> },
        { path: 'xp', element: <DruidXp /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
