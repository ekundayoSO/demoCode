import { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/services`, {
          params: {
            include: 'field_services_section',
          },
        });
        console.log(response.data.data);
        
        setServices(response.data.data[0]);
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
  if (!services) return <div>No services available</div>;

  return (
    <div>
      <h1>{services.title}</h1>
      {services.field_services_section.map((section) => (
        <div
          key={section.id}
          className="mx-auto mb-4"
          style={{border: "4px solid purple", maxWidth: "1600px"}}
          dangerouslySetInnerHTML={{
            __html: section.field_add_section.value,
          }}
        />
      ))}
    </div>
  );
};

export default Services;
