import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faBook, faFile, faFileArchive, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3 } from "@fortawesome/free-brands-svg-icons";

function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "🗂 - MinhSoora";
    // Simulate loading time
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Thông tin các dự án
  const projects = [
    {
      name: "Misachi Bot",
      description: "Bot Discord nhiều chức năng : Economy, Quản Lý Server, Battle Pets,..",
      language: "Javascript",
      users_count: 291,
      trust_count: 29,
      url: "https://top.gg/bot/1354343688121221131"
    },
    {
      name: "Learnix",
      description: "Dự án website học tập tiện lợi cho học sinh THCS, THPT với nhiều tính năng khác nhau.",
      language: "PHP",
      users_count: 3,
      trust_count: 3,
      url: "https://learnix.ct.ws/"
    }
  ];

  const langIcon = {
    JavaScript: <FontAwesomeIcon icon={faJs} />,
    HTML: <FontAwesomeIcon icon={faHtml5} />,
    Python: <FontAwesomeIcon icon={faPython} />,
    Java: <FontAwesomeIcon icon={faJava} />,
    PHP: <FontAwesomeIcon icon={faPhp} />,
    Swift: <FontAwesomeIcon icon={faSwift} />,
    CSS: <FontAwesomeIcon icon={faCss3} />,
    Jar: <FontAwesomeIcon icon={faFileArchive} />,
    Unknown: <FontAwesomeIcon icon={faQuestion} />,
  };

  if (loading) {
    return (
      <div className='font-bold text-neutral-800 w-full pb-4'>
        <div className='mb-3 flex text-3xl gap-2 font-bold'>
          <div className='bg-neutral-800 h-[36px] w-2'></div>
          <h2>Projects 🕓</h2>
        </div>
        <p>Các dự án của tui 💾, tuy không được tốt nhưng... </p>
        <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
          <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
          <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
          <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Projects 🕓</h2>
      </div>
      <p>Các dự án của tui 💾, tuy không được tốt nhưng... </p>
      <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
        {projects.map((project) => (
          <Link to={project.url} key={project.name}>
            <div className='p-6 rounded-xl bg-slate-100 h-full'>
              <div className='flex gap-2 items-center text-cyan-600 mb-2'>
                <FontAwesomeIcon icon={faBook} />
                <p>{project.name}</p>
              </div>
              <p className='text-sm truncate w-full overflow-hidden'>Mô tả: {project.description}</p>
              <div className='flex gap-3 text-sm'>
                {project.language && (
                  <p>
                    {langIcon[project.language] || <FontAwesomeIcon icon={faFile} />} {project.language}
                  </p>
                )}
                <p>
                  <FontAwesomeIcon icon={faUsers} /> {project.users_count}
                </p>
                <p>
                  <FontAwesomeIcon icon={faHeart} /> {project.trust_count}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;
