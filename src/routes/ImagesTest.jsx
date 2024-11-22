import { useEffect, useState } from 'react';
import axios from 'axios';

const DruidProject = () => {
  const [cases, setCases] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/single_case`, {
          params: {
            include:
              'field_hero_image,field_project_description,field_services_taxonomy,field_project_description.field_service_image.field_media_image',
          },
        });

        const { data: responseData, included } = response.data;

        console.log('Response Data:', responseData);
        setCases(responseData);

        // Find the hero image from the included data
        const heroImageData = included?.find((item) => item.type === 'file--file');
        if (heroImageData) {
          const heroImageUrl = `${drupalBaseUrl}${heroImageData.attributes.uri.url}`;
          console.log('Hero Image URL:', heroImageUrl);
          setHeroImage(heroImageUrl);
        }

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
  if (cases.length === 0) return <div>No cases available</div>;

  return (
    <div>
      <h1>All Cases</h1>

      {/* Display the hero image */}
      {heroImage && (
        <img
          src={heroImage}
          alt="Hero Image"
          className="mx-auto w-full h-auto max-w-screen-md object-cover"
          style={{ maxHeight: '700px' }}
        />
      )}

      {cases.map((caseItem) => {
        const { id, attributes } = caseItem;
        const { title, field_client, field_link, field_project_description, field_services_taxonomy } = attributes;

        return (
          <div style={{ border: '4px solid green', maxWidth: '1600px' }} key={id} className="case mb-4 mx-auto">
            <h2>{title}</h2>
            {field_client && <p>Client: {field_client}</p>}
            <h3>Services:</h3>
            <ul>
              {field_services_taxonomy?.map((service) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
            {field_link?.uri && (
              <a href={field_link.uri} target="_blank" rel="noopener noreferrer">
                {field_link.title || 'Visit the site'}
              </a>
            )}
            <h3>Project Description:</h3>
            {field_project_description?.map((item) => {
              switch (item.type) {
                case 'paragraph--company_name':
                  return (
                    <div key={item.id}>
                      <p>{item.field_name?.value || 'Not Provided'}</p>
                    </div>
                  );
                case 'paragraph--topic':
                  return (
                    <div key={item.id}>
                      <h4>{item.field_short_heading?.[0]?.value || 'Topic Title Not Available'}</h4>
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
                case 'paragraph--services_images':
                  return (
                    <div key={item.id}>
                      {item.field_service_image?.uri?.url && (
                        <img
                          src={`${drupalBaseUrl}${item.field_service_image.uri.url}`}
                          alt={item.field_service_image.alt || 'Service Image'}
                        />
                      )}
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

export default DruidProject;
