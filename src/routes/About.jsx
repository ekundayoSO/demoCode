import { useState, useEffect } from "react";
import axios from "axios";
// import { loadMauticTracking } from '../utils/mauticTracking';

import "../App.css";

function About() {
  const [about, setAbout] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // loadMauticTracking();
    axios
      .get('http://drupal10-final-project.lndo.site/jsonapi/node/about_page?include=field_picture')
      .then((response) => {
        const aboutData = response.data.data[0];
        console.log(aboutData);

        setAbout(aboutData);

        if (response.data.included && response.data.included.length > 0) {
          const imageData = response.data.included.find((item) => item.type === 'file--file');
          if (imageData) {
            const imageUrl = imageData.attributes.uri.url;
            setImage(imageUrl);
          }
        }

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
    <div className="d-flex justify-content-center bg-image">
      <div className="mx-4 md:mx-10 lg:mx-40">
        <h1 className="uppercase mt-10 mb-8 text-lg md:text-2xl lg:text-3xl text-center font-bold">
          {about.attributes.title}
        </h1>
        {image && (
          <img
            src={`http://drupal10-final-project.lndo.site${image}`}
            alt="About Image"
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md rounded-full"
          />
        )}
        <div
          className="content about mt-6 text-sm md:text-base lg:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: about.attributes.body.value,
          }}
        />
      </div>
    </div>
  );
}

export default About;
