import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const WorkingWithUs = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null); 
  const [openFAQ, setOpenFAQ] = useState(null);

  const drupalBaseUrl = 'https://druid-final-project-team1.lndo.site';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${drupalBaseUrl}/jsonapi/node/working_with_us`, {
          params: {
            include:
              'field_work_with_us,field_work_with_us.field_service_image.field_media_image,field_work_with_us.field_video',
          },
        });
        console.log(response.data.data);

        setVacancies(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the data');
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.loop = true;
    }
  }, [vacancies]);


  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (vacancies.length === 0) return <div>No services available</div>;

  return (
    <div>
      {vacancies.map((vacancy) => {
        const { id, field_work_with_us } = vacancy;

        return (
          <div style={{ border: '4px solid green', maxWidth: '1600px' }} key={id} className="case mb-4 mx-auto">
            {field_work_with_us?.map((item) => {
              switch (item.type) {
                case 'paragraph--services_images':
                  return (
                    <div key={item.id}>
                      {item.field_service_image && item.field_service_image[0]?.field_media_image && (
                        <img
                          src={`${drupalBaseUrl}${item.field_service_image[0].field_media_image[0].uri.url}`}
                          alt={item.field_service_image[0].field_media_image[0].meta.alt || 'Service Image'}
                          className="mx-auto w-full h-auto max-w-screen-md object-cover"
                        />
                      )}
                    </div>
                  );
                case 'paragraph--hero_message':
                  return (
                    <div key={item.id}>
                      <div dangerouslySetInnerHTML={{ __html: item.field_message?.value || 'Not Provided' }} />
                    </div>
                  );
                case 'paragraph--topic':
                  return (
                    <div key={item.id}>
                      <h4>{item.field_short_heading?.[0]?.value || 'Topic Title Not Available'}</h4>
                    </div>
                  );
                case 'paragraph--faqs':
                  return (
                    <div key={item.id} className="faqs-section pl-4 m-4" style={{maxWidth: "800px"}}>
                      <h3 className="text-lg font-semibold mb-4">FAQs</h3>
                      {item.field_faqs?.map((faq, index) => (
                        <div key={index} className="faq-item border-b border-gray-200">
                          <button
                            className="w-full text-left py-2 px-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => toggleFAQ(index)}
                          >
                            <span className="faq-question font-medium">{faq.question}</span>
                            <svg
                              className={`w-5 h-5 transform transition-transform ${
                                openFAQ === index ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </button>
                          <div
                            className={`faq-answer px-4 overflow-hidden transition-all ${
                              openFAQ === index ? 'max-h-screen' : 'max-h-0'
                            }`}
                            dangerouslySetInnerHTML={{ __html: faq.answer || 'No answer provided' }}
                          />
                        </div>
                      ))}
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
                        <div className="font-bold text-md">
                          <a href={item.field_additional_infomation.uri} target="_blank" rel="noopener noreferrer">
                            {item.field_additional_infomation.title || 'Read more'}
                          </a>
                        </div>
                      )}
                    </div>
                  );
                case 'paragraph--video':
                  return (
                    <div key={item.id} className="video-container">
                      {item.field_video && (
                        <video
                          ref={videoRef} 
                          muted
                          controls
                          width="100%"
                          height="auto"
                        >
                          <source src={`${drupalBaseUrl}${item.field_video.uri}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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

export default WorkingWithUs;
