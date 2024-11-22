import { useState, useEffect } from "react";
import axios from "axios";
// import { loadMauticTracking } from '../utils/mauticTracking';
import "../App.css";

function Projects() {
  const [blogs, setBlogs] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // loadMauticTracking();
    axios
      .get('http://drupal10-final-project.lndo.site/jsonapi/node/article?include=field_image')
      .then((response) => {
        const blogData = response.data.data[0];
        setBlogs(blogData);

        if (response.data.included && response.data.included.length > 0) {
          const imageData = response.data.included.find((item) => item.type === 'file--file');
          if (imageData) {
            const imageUrl = imageData.attributes.uri.url;
            setBlogImage(imageUrl);
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
    <div className="bg-image">
      <div className="mb-4 mx-auto px-4 sm:px-6 lg:px-8 text-justify max-w-screen-lg">
        <h1 className="text-center text-3xl md:text-5xl mb-5 mt-8">{blogs.attributes.title}</h1>
        {blogImage && (
          <img
            src={`http://drupal10-final-project.lndo.site${blogImage}`}
            alt="Decouple Image"
            className="mx-auto w-full h-auto max-w-screen-md object-cover"
            style={{ maxHeight: '700px' }}
          />
        )}
        <div
          className="content mt-6"
          dangerouslySetInnerHTML={{
            __html: blogs.attributes.body.processed,
          }}
        />
      </div>
    </div>
  );
}

export default Projects;
