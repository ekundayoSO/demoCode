import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeesPost = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/meet_the_druids/${id}`, {
          params: {
            include: 'field_people,field_people.field_service_image.field_media_image',
          },
        });
        console.log(response.data.data);
        
        setEmployee(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the data');
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  const { field_people } = employee;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <Link to="/employees" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to All Employees
      </Link>
      {field_people?.map((item) => {
        switch (item.type) {
          case 'paragraph--services_images':
            return (
              <div key={item.id}>
                {item.field_service_image && item.field_service_image[0]?.field_media_image && (
                  <img
                    src={`${drupalBaseUrl}${item.field_service_image[0].field_media_image[0].uri.url}`}
                    alt={item.field_service_image[0].field_media_image[0].meta.alt || 'Employee Image'}
                    className="rounded-full mb-6 mx-auto"
                  />
                )}
              </div>
            );
          case 'paragraph--employee_name':
            return (
              <h1 key={item.id} className="text-3xl font-bold mb-2 text-center">
                {item.field_employee_name.value || 'Name Not Provided'}
              </h1>
            );
          case 'paragraph--employee_title':
            return (
              <h2 key={item.id} className="text-xl text-gray-600 mb-4 text-center">
                {item.field_employee_title.value || 'Title Not Available'}
              </h2>
            );
          case 'paragraph--long_description':
            return (
              <div key={item.id} className="mx-auto text-justify mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.field_content?.[0]?.value || '',
                  }}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default EmployeesPost;
