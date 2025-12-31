import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faBook, faFile, faFileArchive, faQuestion, faStar, faCodeBranch, faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from 'react-markdown';

function GitHubProjects() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    document.title = "🗂 - MinhSoora | GitHub";
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/minhsoora/repos?sort=updated&per_page=100");
      const data = await response.json();
      
      // Filter out forked repos if you want only original ones
      const filteredRepos = data.filter(repo => !repo.fork);
      
      // Sort by stars or update date
      filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      setRepos(filteredRepos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReadme = async (repoName) => {
    try {
      setLoadingReadme(true);
      const response = await fetch(`https://api.github.com/repos/minhsoora/${repoName}/readme`);
      const data = await response.json();
      
      // Decode base64 content
      const decodedContent = atob(data.content);
      setReadmeContent(decodedContent);
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeContent("# README không khả dụng\n\nREADME.md không có sẵn cho repository này.");
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
      "C#": <FontAwesomeIcon icon={faFile} />,
      TypeScript: <FontAwesomeIcon icon={faFile} />,
      "C++": <FontAwesomeIcon icon={faFile} />,
      Go: <FontAwesomeIcon icon={faFile} />,
      Rust: <FontAwesomeIcon icon={faFile} />,
      Kotlin: <FontAwesomeIcon icon={faFile} />,
      Ruby: <FontAwesomeIcon icon={faFile} />,
      Shell: <FontAwesomeIcon icon={faFile} />,
      Dockerfile: <FontAwesomeIcon icon={faFileArchive} />,
      Vue: <FontAwesomeIcon icon={faFile} />,
      React: <FontAwesomeIcon icon={faReact} />,
      "Node.js": <FontAwesomeIcon icon={faNodeJs} />,
    };
    
    return iconMap[language] || <FontAwesomeIcon icon={faQuestion} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className='font-bold text-neutral-800 w-full pb-4'>
        <div className='mb-3 flex text-3xl gap-2 font-bold'>
          <div className='bg-neutral-800 h-[36px] w-2'></div>
          <h2>GitHub Projects 🕓</h2>
        </div>
        <p>Đang tải các repository từ GitHub...</p>
        <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='bg-slate-300 animate-pulse w-full h-[140px] rounded-xl'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>GitHub Projects</h2>
      </div>
      <p>Các repository của tôi trên GitHub. Nhấp vào để xem chi tiết.</p>
      
      <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className='p-6 rounded-xl bg-slate-100 h-full cursor-pointer hover:bg-slate-200 transition-colors'
            onClick={() => handleRepoClick(repo)}
          >
            <div className='flex gap-2 items-center text-cyan-600 mb-2'>
              <FontAwesomeIcon icon={faBook} />
              <p className='truncate'>{repo.name}</p>
            </div>
            
            <p className='text-sm mb-3 h-[40px] overflow-hidden'>
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
                Cập nhật: {formatDate(repo.updated_at)}
              </span>
            </div>
            
            {repo.homepage && (
              <div className='mt-2 text-xs'>
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className='text-blue-500 hover:underline'
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} /> Website
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} />
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
                  Xem trên GitHub
                </a>
                
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    <span>{selectedRepo.stargazers_count}</span>
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <span>{selectedRepo.forks_count}</span>
                  </span>
                  
                  <span className="flex items-center gap-1">
                    {getLanguageIcon(selectedRepo.language)}
                    <span>{selectedRepo.language || "Không xác định"}</span>
                  </span>
                  
                  <span className="text-gray-600">
                    Size: {Math.round(selectedRepo.size / 1024)} MB
                  </span>
                </div>
              </div>
            </div>

            {/* README Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <h4 className="text-lg font-bold mb-4">README.md</h4>
              {loadingReadme ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({node, ...props}) => (
                        <a 
                          {...props} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-600 hover:underline"
                        />
                      ),
                      code: ({node, inline, ...props}) => (
                        <code 
                          {...props} 
                          className={inline ? "bg-gray-100 px-1 rounded" : "block bg-gray-100 p-2 rounded overflow-x-auto"}
                        />
                      ),
                      pre: ({node, ...props}) => (
                        <div className="overflow-x-auto">
                          <pre {...props} />
                        </div>
                      )
                    }}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS cho Markdown */}
      <style jsx>{`
        .prose h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
        .prose h2 { font-size: 1.5em; font-weight: bold; margin: 0.83em 0; }
        .prose h3 { font-size: 1.17em; font-weight: bold; margin: 1em 0; }
        .prose p { margin: 1em 0; }
        .prose ul { list-style-type: disc; margin: 1em 0; padding-left: 2em; }
        .prose ol { list-style-type: decimal; margin: 1em 0; padding-left: 2em; }
        .prose blockquote { border-left: 4px solid #ccc; margin: 1em 0; padding-left: 1em; }
        .prose table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        .prose th, .prose td { border: 1px solid #ddd; padding: 8px; }
        .prose th { background-color: #f2f2f2; }
        .prose img { max-width: 100%; height: auto; }
      `}</style>
    </div>
  );
}

export default Projects;
