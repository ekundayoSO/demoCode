import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Projects() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://drupal10-final-project.lndo.site/jsonapi/node/projects_page')
      .then((response) => {
        const projectsData = response.data.data[0];
        setProjects(projectsData);
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
    <div className="flex justify-center bg-image min-h-screen py-10 px-4 md:px-10">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="uppercase mt-10 mb-8 text-xl md:text-2xl lg:text-3xl text-center font-bold">
          {projects.attributes.title}
        </h1>

        <div
          className="projects text-base md:text-lg lg:text-xl"
          dangerouslySetInnerHTML={{
            __html: projects.attributes.body.value,
          }}
        />
      </div>
    </div>
  );
}

export default Projects;
