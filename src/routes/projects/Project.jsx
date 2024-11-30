import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DruidProjectCase = () => {
  const [caseData, setCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/single_case/${id}`, {
          params: {
            include:
              'field_hero_image,field_project_description,field_services_taxonomy,field_project_description.field_service_image.field_media_image',
          },
        });
        console.log(response.data.data);
        
        setCaseData(response.data.data);
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
  if (!caseData) return <div>No case data available</div>;

  const { title, field_client, field_hero_image, field_services_taxonomy, field_link, field_project_description } =
    caseData;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to all cases
      </Link>
      {field_hero_image && (
        <img
          src={`${drupalBaseUrl}${field_hero_image.uri.url}`}
          alt={field_hero_image.meta.alt || 'Hero Image'}
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex flex-row items-center justify-between space-x-4 mb-4">
        {field_client && <p className="text-md">Client: {field_client}</p>}
        <div className="flex items-center space-x-2">
          <h2 className="text-md">Services:</h2>
          <ul className="flex">
            {field_services_taxonomy?.map((service, index, array) => (
              <li className="inline-block list-none" key={service.id}>
                {service.name}
                {index < array.length - 1 && <span className="mr-1">,</span>}
              </li>
            ))}
          </ul>
        </div>

        {field_link?.uri && (
          <a href={field_link.uri} target="_blank" rel="noopener noreferrer">
            <span className="mr-1 text-red-500">&rarr;</span>
            {field_link.title || 'Visit the site'}
          </a>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {field_project_description?.map((item) => {
        switch (item.type) {
          case 'paragraph--company_name':
            return (
              <p key={item.id} className="mb-4">
                {item.field_name.value || 'Not Provided'}
              </p>
            );
          case 'paragraph--topic':
            return (
              <h3 key={item.id} className="text-xl font-medium mt-4 mb-2">
                {item.field_short_heading[0].value || 'Topic Title Not Available'}
              </h3>
            );
          case 'paragraph--long_description':
            return (
              <div
                key={item.id}
                className="mb-4 text-justify"
                dangerouslySetInnerHTML={{
                  __html: item.field_content?.[0]?.value || 'Long Description Not Available',
                }}
              />
            );
          case 'paragraph--services_images':
            return (
              item.field_service_image &&
              item.field_service_image[0]?.field_media_image && (
                <img
                  key={item.id}
                  src={`${drupalBaseUrl}${item.field_service_image[0].field_media_image[0].uri.url}`}
                  alt={item.field_service_image[0].field_media_image[0].meta.alt || 'Service Image'}
                  className="w-full h-auto mt-4 mb-4 rounded-lg"
                />
              )
            );
          default:
            return <p key={item.id}>Unhandled paragraph type: {item.type}</p>;
        }
      })}
    </div>
  );
};

export default DruidProjectCase;
