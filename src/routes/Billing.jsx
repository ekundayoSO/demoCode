import { useEffect, useState } from 'react';
import axios from 'axios';

const Billing = () => {
  const [billing, setBilling] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/billing`
        );
        const billingData = response.data.data[0]
        console.log(billingData);

        setBilling(billingData);
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

  return (
    <div className='mx-auto mt-2' style={{border: "4px solid purple", maxWidth: "1400px"}}>
      <div
        dangerouslySetInnerHTML={{
          __html: billing.body?.[0]?.value || 'Long Description Not Available',
        }}
      />
    </div>
  );
}

export default Billing;
