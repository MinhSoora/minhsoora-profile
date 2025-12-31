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
      const response = await fetch(`https://api.github.com/repos/minhsoora/${repoName}/readme`, {
        headers: {
          'Accept': 'application/vnd.github.v3.raw+json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.text();
      setReadmeContent(data);
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeContent("# README không khả dụng\n\nKhông thể tải README.md từ GitHub.\n\n[View on GitHub](" + (selectedRepo?.html_url || "#") + ")");
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

  // Hàm render README với format đẹp
  const renderReadme = (content) => {
    if (!content) return null;
    
    // Chia thành các dòng và xử lý
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      // Xử lý tiêu đề
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-4 mb-2 text-cyan-700">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-3 mb-2 text-cyan-600">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-2 mb-1 text-cyan-500">{line.substring(4)}</h3>;
      }
      
      // Xử lý danh sách
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
      }
      if (/^\d+\./.test(line)) {
        return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      
      // Xử lý mã nguồn (code blocks)
      if (line.startsWith('```')) {
        return <div key={index} className="my-2"></div>;
      }
      
      // Xử lý link [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      let lastIndex = 0;
      const parts = [];
      
      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a 
            key={match.index} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-600 hover:underline"
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      if (parts.length > 0) {
        return <p key={index} className="my-2">{parts}</p>;
      }
      
      // Xử lý dòng trống
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Dòng bình thường
      return <p key={index} className="my-2">{line}</p>;
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
            className='p-6 rounded-xl bg-slate-100 h-full cursor-pointer hover:bg-slate-200 transition-colors duration-200'
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
                <span className='flex items-center gap-1 bg-cyan-100 px-2 py-1 rounded-full'>
                  {getLanguageIcon(repo.language)}
                  <span className="text-cyan-700">{repo.language}</span>
                </span>
              )}
              
              <span className='flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full'>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <span className="text-yellow-700">{repo.stargazers_count}</span>
              </span>
              
              <span className='flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full'>
                <FontAwesomeIcon icon={faCodeBranch} className="text-green-500" />
                <span className="text-green-700">{repo.forks_count}</span>
              </span>
              
              <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                {formatDate(repo.updated_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedRepo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-cyan-50 to-white">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faBook} className="text-cyan-600 text-xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-700">
                      {selectedRepo.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedRepo.description || "Không có mô tả"}
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={closePopup}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Đóng"
              >
                <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Stats */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-wrap gap-3 items-center">
                <a 
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  <span className="font-semibold">Xem trên GitHub</span>
                </a>
                
                {selectedRepo.homepage && (
                  <a 
                    href={selectedRepo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    <span className="font-semibold">Visit Website</span>
                  </a>
                )}
                
                <div className="flex flex-wrap gap-3 ml-auto">
                  <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    <span className="font-semibold text-gray-700">{selectedRepo.stargazers_count}</span>
                    <span className="text-gray-500">Stars</span>
                  </span>
                  
                  <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faCodeBranch} className="text-green-500" />
                    <span className="font-semibold text-gray-700">{selectedRepo.forks_count}</span>
                    <span className="text-gray-500">Forks</span>
                  </span>
                  
                  {selectedRepo.language && (
                    <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      {getLanguageIcon(selectedRepo.language)}
                      <span className="font-semibold text-gray-700">{selectedRepo.language}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* README Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-cyan-700 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  README.md
                </h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Cập nhật: {formatDate(selectedRepo.updated_at)}
                </span>
              </div>
              
              {loadingReadme ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : (
                <div className="readme-content font-sans text-gray-800 leading-relaxed">
                  {renderReadme(readmeContent)}
                </div>
              )}
              
              {!loadingReadme && readmeContent.includes("README không khả dụng") && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <FontAwesomeIcon icon={faFile} className="text-6xl" />
                  </div>
                  <p className="text-gray-600 mb-4">Không tìm thấy README.md cho repository này.</p>
                  <a 
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    Xem repository trên GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles cho README */}
      <style jsx>{`
        .readme-content {
          font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.7;
        }
        
        .readme-content h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0e7490;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0f2fe;
        }
        
        .readme-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0891b2;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .readme-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #06b6d4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .readme-content p {
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .readme-content ul, .readme-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .readme-content li {
          margin-bottom: 0.5rem;
        }
        
        .readme-content code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #dc2626;
        }
        
        .readme-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.875rem;
        }
        
        .readme-content blockquote {
          border-left: 4px solid #06b6d4;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #4b5563;
          font-style: italic;
          background-color: #f0f9ff;
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        .readme-content a {
          color: #0891b2;
          text-decoration: none;
          font-weight: 500;
        }
        
        .readme-content a:hover {
          text-decoration: underline;
          color: #0e7490;
        }
        
        .readme-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .readme-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        
        .readme-content th {
          background-color: #f8fafc;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        
        .readme-content td {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          color: #4b5563;
        }
        
        .readme-content tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .readme-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}

export default Projects;
