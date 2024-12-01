import { useEffect, useState } from 'react';
import axios from 'axios';

const DruidXp = () => {
  const [xp, setXp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/druid_xp`, {
          params: {
            include: 'field_druid_xp,field_druid_xp.field_add_image.field_media_image',
          },
        });
        console.log(response.data.data);

        setXp(response.data.data);
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
  if (xp.length === 0) return <div>No services available</div>;

  return (
    <div>
      {xp.map((node) => {
        const { id, field_druid_xp } = node;

        return (
          <div style={{ border: '4px solid green', maxWidth: '1600px' }} key={id} className="case mb-4 mx-auto">
            {field_druid_xp?.map((item) => {
              switch (item.type) {
                case 'paragraph--add_image':
                  return (
                    <div key={item.id}>
                      {item.field_add_image && item.field_add_image[0]?.field_media_image && (
                        <img
                          src={`${drupalBaseUrl}${item.field_add_image[0].field_media_image[0].uri.url}`}
                          alt={item.field_add_image[0].field_media_image[0].meta.alt || 'XP Image'}
                          className="mx-auto w-full h-auto max-w-screen-md object-cover"
                        />
                      )}
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
                  case 'paragraph--link':
                  return (
                    <div key={item.id}>
                      {item.field_additional_infomation && (
                        <div>
                          <a href={item.field_additional_infomation.uri} target="_blank" rel="noopener noreferrer">
                            {item.field_additional_infomation.title || 'Read more'}
                          </a>
                        </div>
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

export default DruidXp;
