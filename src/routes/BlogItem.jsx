import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogItem = () => {
  const [blogItems, setBlogItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/blog_item`, {
          params: {
            include:
              'field_add_title_text_content_ima,field_blog_taxonomy,field_hero_image,field_add_title_text_content_ima.field_add_image.field_media_image,field_author',
          },
        });

        console.log(response.data.data);
        

        setBlogItems(response.data.data);
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
  if (blogItems.length === 0) return <div>No blog items available</div>;

  return (
    <div>
      {blogItems.map((item) => (
        <div
          key={item.id}
          className="blog-item"
          style={{ border: '4px solid green', maxWidth: '1600px', margin: '20px auto' }}
        >
          {item.field_hero_image && (
            <img
              src={`${drupalBaseUrl}${item.field_hero_image.uri.url}`}
              alt={item.field_hero_image.meta.alt || 'Hero Image'}
              className="mx-auto w-full h-auto max-w-screen-md object-cover"
              style={{ maxHeight: '700px' }}
            />
          )}
          <p>
            {new Date(item.field_date_of_post)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .replace(/\//g, '.')}
          </p>
          <p>{item.field_author?.display_name}</p>
          <h2>{item.field_add_title}</h2>
          <ul>
            {Array.isArray(item.field_blog_taxonomy) && item.field_blog_taxonomy.length > 0 ? (
              <ul>
                {item.field_blog_taxonomy?.map((taxonomy) => (
                  <li key={taxonomy.id}>{taxonomy.name}</li>
                ))}
              </ul>
            ) : (
              <p>No categories</p>
            )}
          </ul>
          <h4>{item.field_short_description?.value}</h4>
          {item.field_add_title_text_content_ima?.map((content) => {
            switch (content.type) {
              case 'paragraph--add_title':
                return <h3 key={content.id}>{content.field_add_title?.[0]?.value}</h3>;
              case 'paragraph--add_textfield':
                return (
                  <div key={content.id} dangerouslySetInnerHTML={{ __html: content.field_add_textfield?.value }} />
                );
              case 'paragraph--add_link':
                return (
                  <div key={content.id}>
                    <a href={content.field_add_link?.uri} target="_blank" rel="noopener noreferrer">
                      {content.field_add_link?.title || 'Visit link'}
                    </a>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default BlogItem;
