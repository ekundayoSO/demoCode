import { useEffect, useState } from 'react';
import axios from 'axios';

const MeetTheDruids = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/meet_the_druids`, {
          params: {
            include: 'field_people,field_people.field_service_image.field_media_image',
          },
        });
        console.log(response.data.data);

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
  if (employees.length === 0) return <div>No services available</div>;

  return (
    <div>
      {employees.map((people) => {
        const { id, title, field_people } = people;

        return (
          <div style={{ border: '4px solid green', maxWidth: '1600px' }} key={id} className="case mb-4 mx-auto">
            <h2 className="font-bold">{title.toUpperCase()}</h2>
            {field_people?.map((item) => {
              switch (item.type) {
                case 'paragraph--services_images':
                  return (
                    <div key={item.id}>
                      {item.field_service_image && item.field_service_image[0]?.field_media_image && (
                        <img
                          src={`${drupalBaseUrl}${item.field_service_image[0].field_media_image[0].uri.url}`}
                          alt={item.field_service_image[0].field_media_image[0].meta.alt || 'Service Image'}
                          className="mx-auto w-full h-auto max-w-screen-md object-cover"
                        />
                      )}
                    </div>
                  );
                case 'paragraph--employee_name':
                  return (
                    <div key={item.id}>
                      <h4>{item.field_employee_name.value || 'Name Not Provided'}</h4>
                    </div>
                  );
                case 'paragraph--employee_title':
                  return (
                    <div key={item.id}>
                      <h4>{item.field_employee_title.value || 'Title Not Available'}</h4>
                    </div>
                  );
                case 'paragraph--long_description':
                  return (
                    <div key={item.id}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.field_content?.[0]?.value || 'Long Description Not Available',
                        }}
                      />
                    </div>
                  );
                default:
                  return (
                    <div key={item.id}>
                      <p>Unhandled paragraph type: {item.type}</p>
                    </div>
                  );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MeetTheDruids;
