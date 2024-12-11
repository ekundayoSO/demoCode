import { useEffect, useState } from 'react';
import axios from 'axios';

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/maintenance`);
        const maintenanceData = response.data.data;
        console.log(maintenanceData);

        setMaintenance(maintenanceData);
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
  if (maintenance.length === 0) return <div>No maintenance data available</div>;

  return (
    <div className="mx-auto mt-2" style={{ border: '4px solid purple', maxWidth: '1400px' }}>
      {maintenance.map((item) => (
        <div key={item.id}>
          {item.field_long_description.map((description, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: description.processed }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maintenance;
