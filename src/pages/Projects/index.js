import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, faFile, faStar, faCodeBranch, 
  faExternalLinkAlt, faTimes, faSpinner, faExpand 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faHtml5, faJs, faPython, faJava, 
  faPhp, faSwift, faCss3 
} from "@fortawesome/free-brands-svg-icons";

function Projects() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // New states for iframe loading
  const [showIframeLoader, setShowIframeLoader] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    document.title = "🗂 - MinhSoora";
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/minhsoora/repos?sort=updated&per_page=100");
      const data = await response.json();
      
      const filteredRepos = data.filter(repo => !repo.fork);
      filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      setRepos(filteredRepos);
    } catch (error) {
      console.error("Error:", error);
      setRepos([
        {
          id: 1,
          name: "Misachi Bot",
          description: "Bot Discord nhiều chức năng",
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
          description: "Website học tập cho học sinh",
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
      
      const urls = [
        `https://raw.githubusercontent.com/minhsoora/${repoName}/main/README.md`,
        `https://raw.githubusercontent.com/minhsoora/${repoName}/master/README.md`
      ];
      
      let content = "";
      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            content = await response.text();
            break;
          }
        } catch (err) {
          continue;
        }
      }
      
      if (!content) {
        const apiResponse = await fetch(`https://api.github.com/repos/minhsoora/${repoName}/readme`);
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          if (data.content && data.encoding === "base64") {
            content = atob(data.content);
          }
        }
      }
      
      setReadmeContent(content || "# No README available");
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeContent("# Error loading README\n\nPlease check the repository on GitHub.");
    } finally {
      setLoadingReadme(false);
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setIsClosing(false);
    fetchReadme(repo.name);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedRepo(null);
      setReadmeContent("");
      setIsClosing(false);
    }, 300);
  };

  const handleLinkClick = (e, url) => {
    e.preventDefault();
    setShowIframeLoader(true);
    setIframeUrl(url);
    setIframeLoading(true);
    
    // Simulate loading for 5 seconds
    setTimeout(() => {
      setIframeLoading(false);
      // Fade to black then show iframe
      setTimeout(() => {
        setShowIframe(true);
      }, 500);
    }, 5000);
  };

  const closeIframeViewer = () => {
    setShowIframe(false);
    setTimeout(() => {
      setShowIframeLoader(false);
      setIframeUrl("");
      setIframeLoading(false);
    }, 500);
  };

  const openFullscreen = () => {
    window.open(iframeUrl, '_blank');
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

  const renderMarkdown = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-cyan-700 mt-4 mb-2">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-cyan-600 mt-3 mb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-cyan-500 mt-2 mb-1">{line.substring(4)}</h3>;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc my-1">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="my-2 text-gray-800">{line}</p>;
    });
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
          {[...Array(3)].map((_, i) => (
            <div key={i} className='relative bg-gradient-to-br from-slate-200 to-slate-300 w-full h-[120px] rounded-xl overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
        }
        @keyframes fadeToBlack {
          0% { background-color: rgba(0, 0, 0, 0.5); }
          100% { background-color: rgba(0, 0, 0, 0.95); }
        }
        @keyframes fadeFromBlack {
          0% { background-color: rgba(0, 0, 0, 0.95); }
          100% { background-color: rgba(0, 0, 0, 0.5); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-morph {
          animation: morph 8s ease-in-out infinite, spin-slow 20s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 1, 1);
        }
        .animate-fadeToBlack {
          animation: fadeToBlack 0.5s ease-out forwards;
        }
        .animate-fadeFromBlack {
          animation: fadeFromBlack 0.5s ease-out forwards;
        }
      `}</style>

      <div className='font-bold text-neutral-800 w-full pb-4'>
        <div className='mb-3 flex text-3xl gap-2 font-bold'>
          <div className='bg-neutral-800 h-[36px] w-2'></div>
          <h2>Projects</h2>
        </div>
        <p>Các dự án của toi đang/đã/sẽ thực hiện.</p>
        
        <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
          {repos.map((repo) => (
            <div 
              key={repo.id} 
              className='p-6 rounded-xl bg-slate-100 h-full cursor-pointer hover:bg-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300'
              onClick={() => handleRepoClick(repo)}
            >
              <div className='flex gap-2 items-center text-cyan-600 mb-2'>
                <FontAwesomeIcon icon={faBook} />
                <p className="font-bold">{repo.name}</p>
              </div>
              
              <p className='text-sm mb-3 truncate text-gray-700'>
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
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isClosing ? 'animate-fadeIn' : 'animate-fadeIn'}`}>
            <div className={`bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
              {/* Header */}
              <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-cyan-50 to-blue-50">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-700">
                    {selectedRepo.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedRepo.description}
                  </p>
                </div>
                <button 
                  onClick={closePopup}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all hover:rotate-90 duration-300"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Stats */}
              <div className="p-6 border-b">
                <div className="flex gap-4 flex-wrap">
                  <button 
                    onClick={(e) => handleLinkClick(e, selectedRepo.html_url)}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> View on GitHub
                  </button>
                  
                  {selectedRepo.homepage && (
                    <button 
                      onClick={(e) => handleLinkClick(e, selectedRepo.homepage)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit Website
                    </button>
                  )}
                  
                  <div className="flex gap-4 ml-auto">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                      <span>{selectedRepo.stargazers_count} Stars</span>
                    </span>
                    
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCodeBranch} />
                      <span>{selectedRepo.forks_count} Forks</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* README Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <h4 className="text-lg font-bold mb-4">README.md</h4>
                {loadingReadme ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-morph"></div>
                      <div className="absolute inset-2 bg-white rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FontAwesomeIcon icon={faSpinner} className="text-2xl text-cyan-600 animate-spin" />
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 font-semibold">Đang tải README...</p>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">
                    {renderMarkdown(readmeContent)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Iframe Loader & Viewer */}
        {showIframeLoader && (
          <div className={`fixed inset-0 z-[100] flex items-center justify-center ${
            iframeLoading ? 'animate-fadeToBlack' : showIframe ? 'bg-black bg-opacity-50' : 'animate-fadeFromBlack'
          }`}
          style={{ backgroundColor: iframeLoading ? undefined : (showIframe ? 'rgba(0,0,0,0.5)' : undefined) }}
          >
            {iframeLoading && (
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-morph"></div>
                  <div className="absolute inset-3 bg-gray-900 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-4xl text-white animate-spin" />
                  </div>
                </div>
                <p className="mt-6 text-white text-xl font-semibold">Đang tải trang...</p>
                <div className="mt-4 flex gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            {showIframe && (
              <div className="w-full h-full p-4 md:p-8 animate-fadeIn">
                <div className="bg-white rounded-xl shadow-2xl w-full h-full flex flex-col overflow-hidden">
                  {/* Iframe Header */}
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center">
                    <div className="text-white font-semibold truncate flex-1 mr-4">
                      {iframeUrl}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={openFullscreen}
                        className="px-4 py-2 bg-white text-cyan-600 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faExpand} />
                        <span className="hidden sm:inline">Fullscreen</span>
                      </button>
                      <button
                        onClick={closeIframeViewer}
                        className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>

                  {/* Iframe */}
                  <div className="flex-1 relative">
                    <iframe
                      src={iframeUrl}
                      className="w-full h-full border-0"
                      title="Website Preview"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;
