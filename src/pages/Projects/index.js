import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faBook, faFile, faFileArchive, faQuestion, faStar, faCodeBranch, faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";

function Projects() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    document.title = "🗂 - MinhSoora";
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/minhsoora/repos?sort=updated&per_page=100");
      const data = await response.json();
      
      // Filter out forked repos
      const filteredRepos = data.filter(repo => !repo.fork);
      filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      setRepos(filteredRepos);
    } catch (error) {
      console.error("Error:", error);
      // Nếu API lỗi, sử dụng dữ liệu mẫu
      setRepos([
        {
          id: 1,
          name: "Misachi Bot",
          description: "Bot Discord nhiều chức năng : Economy, Quản Lý Server, Battle Pets,..",
          language: "JavaScript",
          stargazers_count: 291,
          forks_count: 29,
          html_url: "https://github.com/minhsoora/misachi-bot",
          updated_at: "2024-01-01T00:00:00Z",
          homepage: "https://top.gg/bot/1354343688121221131"
        },
        {
          id: 2,
          name: "Learnix",
          description: "Dự án website học tập tiện lợi cho học sinh THCS, THPT với nhiều tính năng khác nhau.",
          language: "PHP",
          stargazers_count: 3,
          forks_count: 3,
          html_url: "https://github.com/minhsoora/learnix",
          updated_at: "2024-01-01T00:00:00Z",
          homepage: "https://learnix.ct.ws/"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchReadme = async (repoName) => {
    try {
      setLoadingReadme(true);
      const response = await fetch(`https://api.github.com/repos/minhsoora/${repoName}/readme`);
      const data = await response.json();
      
      if (data.content) {
        const decodedContent = atob(data.content);
        setReadmeContent(decodedContent);
      } else {
        setReadmeContent("# README không khả dụng\n\nREADME.md không có sẵn cho repository này.");
      }
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeContent("# README không khả dụng\n\nKhông thể tải README.md từ GitHub.\n\n[View on GitHub](" + selectedRepo.html_url + ")");
    } finally {
      setLoadingReadme(false);
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    fetchReadme(repo.name);
  };

  const closePopup = () => {
    setSelectedRepo(null);
    setReadmeContent("");
  };

  const getLanguageIcon = (language) => {
    const iconMap = {
      JavaScript: <FontAwesomeIcon icon={faJs} />,
      HTML: <FontAwesomeIcon icon={faHtml5} />,
      Python: <FontAwesomeIcon icon={faPython} />,
      Java: <FontAwesomeIcon icon={faJava} />,
      PHP: <FontAwesomeIcon icon={faPhp} />,
      Swift: <FontAwesomeIcon icon={faSwift} />,
      CSS: <FontAwesomeIcon icon={faCss3} />,
    };
    
    return iconMap[language] || <FontAwesomeIcon icon={faFile} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className='font-bold text-neutral-800 w-full pb-4'>
        <div className='mb-3 flex text-3xl gap-2 font-bold'>
          <div className='bg-neutral-800 h-[36px] w-2'></div>
          <h2>Projects 🕓</h2>
        </div>
        <p>Đang tải các dự án từ GitHub...</p>
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
        <h2>Projects</h2>
      </div>
      <p>Các dự án của toi đang/đã/sẽ thực hiện. </p>
      
      <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className='p-6 rounded-xl bg-slate-100 h-full cursor-pointer hover:bg-slate-200 transition-colors'
            onClick={() => handleRepoClick(repo)}
          >
            <div className='flex gap-2 items-center text-cyan-600 mb-2'>
              <FontAwesomeIcon icon={faBook} />
              <p>{repo.name}</p>
            </div>
            
            <p className='text-sm mb-3 truncate'>
              {repo.description || "Không có mô tả"}
            </p>
            
            <div className='flex gap-3 text-sm flex-wrap'>
              {repo.language && (
                <span className='flex items-center gap-1'>
                  {getLanguageIcon(repo.language)}
                  <span>{repo.language}</span>
                </span>
              )}
              
              <span className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faStar} />
                <span>{repo.stargazers_count}</span>
              </span>
              
              <span className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faCodeBranch} />
                <span>{repo.forks_count}</span>
              </span>
              
              <span className='text-xs text-gray-500'>
                {formatDate(repo.updated_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-cyan-600">
                  {selectedRepo.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedRepo.description}
                </p>
              </div>
              <button 
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Stats */}
            <div className="p-6 border-b">
              <div className="flex gap-4 flex-wrap">
                <a 
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} /> Xem trên GitHub
                </a>
                
                {selectedRepo.homepage && (
                  <a 
                    href={selectedRepo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit Website
                  </a>
                )}
              </div>
              
              <div className="flex gap-4 mt-3">
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                  <span>{selectedRepo.stargazers_count} Stars</span>
                </span>
                
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCodeBranch} />
                  <span>{selectedRepo.forks_count} Forks</span>
                </span>
                
                {selectedRepo.language && (
                  <span className="flex items-center gap-1">
                    {getLanguageIcon(selectedRepo.language)}
                    <span>{selectedRepo.language}</span>
                  </span>
                )}
              </div>
            </div>

            {/* README Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <h4 className="text-lg font-bold mb-4">README.md</h4>
              {loadingReadme ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-mono text-sm">
                  {readmeContent}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
