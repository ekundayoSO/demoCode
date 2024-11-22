import { useState, useEffect } from "react";
import axios from "axios";
// import { loadMauticTracking } from '../utils/mauticTracking';
import "../App.css";

function Home() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // loadMauticTracking();
    axios
      .get('http://drupal10-final-project.lndo.site/jsonapi/node/home_page')
      .then((response) => {
        const homeData = response.data.data[0];
        setHome(homeData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  return (
    <div className="bg-image content-home">
      <div className="mb-4 mx-auto px-4 md:px-10 lg:px-40 text-justify">
        <h1 className="text-center text-2xl md:text-4xl mb-4 md:mb-8 home uppercase font-bold">
          {home.attributes.title}
        </h1>
        <div
          className="text-lg md:text-2xl lg:text-3xl"
          dangerouslySetInnerHTML={{
            __html: home.attributes.body.value,
          }}
        />
      </div>
    </div>
  );
}

export default Home;
