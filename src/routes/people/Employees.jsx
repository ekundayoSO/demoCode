import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeesPost = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(8);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/meet_the_druids`, {
          params: {
            include: 'field_people,field_people.field_service_image.field_media_image',
          },
        });
        setEmployees(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the data');
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (employees.length === 0) return <div>No employees available</div>;

  const visibleEmployees = employees.slice(0, displayCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meet The Druids</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleEmployees.map((employee) => {
          const {id, field_people } = employee;

          let imageUrl = '';
          let name = '';
          let title = '';

          field_people?.forEach((item) => {
            switch (item.type) {
              case 'paragraph--services_images':
                imageUrl = item.field_service_image && item.field_service_image[0]?.field_media_image[0]?.uri.url;
                break;
              case 'paragraph--employee_name':
                name = item.field_employee_name?.value || 'Name Not Provided';
                break;
              case 'paragraph--employee_title':
                title = item.field_employee_title?.value || 'Title Not Available';
                break;
            }
          });

          return (
            <Link
              to={`/employees/${id}`}
              key={id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {imageUrl && <img src={`${drupalBaseUrl}${imageUrl}`} alt={name} className="rounded-full mx-auto" />}
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-gray-600">{title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {employees.length > 8 && displayCount < employees.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setDisplayCount(employees.length)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            View All Employees
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeesPost;
