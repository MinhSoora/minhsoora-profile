import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, faFile, faStar, faCodeBranch, 
  faExternalLinkAlt, faTimes, faSpinner 
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
  const [readmeError, setReadmeError] = useState("");

  useEffect(() => {
    document.title = "🗂 - MinhSoora";
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/minhsoora/repos?sort=updated&per_page=100");
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter out forked repos
      const filteredRepos = data.filter(repo => !repo.fork);
      filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      setRepos(filteredRepos);
    } catch (error) {
      console.error("Error fetching repos:", error);
      // Fallback data
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
      setReadmeError("");
      setReadmeContent("");
      
      // Try multiple approaches
      const approaches = [
        // Try raw URL with main branch
        `https://raw.githubusercontent.com/minhsoora/${repoName}/main/README.md`,
        // Try raw URL with master branch
        `https://raw.githubusercontent.com/minhsoora/${repoName}/master/README.md`,
        // Try GitHub API
        `https://api.github.com/repos/minhsoora/${repoName}/readme`
      ];
      
      let success = false;
      
      for (let i = 0; i < approaches.length; i++) {
        try {
          const url = approaches[i];
          const response = await fetch(url);
          
          if (response.ok) {
            if (url.includes('api.github.com')) {
              // GitHub API response (JSON with base64)
              const data = await response.json();
              if (data.content && data.encoding === "base64") {
                const decodedContent = atob(data.content);
                setReadmeContent(decodedContent);
                success = true;
                break;
              }
            } else {
              // Raw URL response (plain text)
              const text = await response.text();
              setReadmeContent(text);
              success = true;
              break;
            }
          }
        } catch (err) {
          console.log(`Approach ${i} failed:`, err.message);
          // Continue to next approach
        }
      }
      
      if (!success) {
        throw new Error("Không thể tải README từ bất kỳ nguồn nào");
      }
      
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeError(error.message);
      setReadmeContent(`# README không khả dụng\n\n${error.message}\n\n[View Repository on GitHub](${selectedRepo?.html_url || "#"})`);
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
    setReadmeError("");
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
      TypeScript: <FontAwesomeIcon icon={faFile} />,
      "C++": <FontAwesomeIcon icon={faFile} />,
      Go: <FontAwesomeIcon icon={faFile} />,
      Rust: <FontAwesomeIcon icon={faFile} />,
      Ruby: <FontAwesomeIcon icon={faFile} />,
      Shell: <FontAwesomeIcon icon={faFile} />,
    };
    
    return iconMap[language] || <FontAwesomeIcon icon={faFile} />;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "N/A";
    }
  };

  // Simple markdown renderer
  const renderReadme = (content) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    
    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
        }
        return;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-cyan-700 mt-6 mb-4 pb-2 border-b border-cyan-100">
            {line.substring(2)}
          </h1>
        );
        return;
      }
      
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-cyan-600 mt-5 mb-3">
            {line.substring(3)}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-cyan-500 mt-4 mb-2">
            {line.substring(4)}
          </h3>
        );
        return;
      }
      
      // Handle horizontal rule
      if (line.match(/^[-*_]{3,}$/)) {
        elements.push(<hr key={`hr-${index}`} className="my-6 border-t border-gray-300" />);
        return;
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        elements.push(<div key={`empty-${index}`} className="h-3"></div>);
        return;
      }
      
      // Handle lists
      if (line.match(/^[\s]*[-*+]\s/)) {
        const content = line.replace(/^[\s]*[-*+]\s/, '');
        elements.push(
          <li key={`li-${index}`} className="ml-6 my-1 list-disc">
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }
      
      if (line.match(/^[\s]*\d+\.\s/)) {
        const content = line.replace(/^[\s]*\d+\.\s/, '');
        elements.push(
          <li key={`oli-${index}`} className="ml-6 my-1 list-decimal">
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }
      
      // Regular paragraph
      elements.push(
        <p key={index} className="my-3 text-gray-800 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
    
    // Wrap list items in ul/ol
    const wrappedElements = [];
    let inList = false;
    let isOrderedList = false;
    
    elements.forEach((element, index) => {
      if (element.type === 'li') {
        if (!inList) {
          inList = true;
          isOrderedList = element.props.className?.includes('list-decimal') || false;
          wrappedElements.push(
            isOrderedList ? 
              <ol key={`list-start-${index}`} className="my-4 ml-8"> :
              <ul key={`list-start-${index}`} className="my-4 ml-8">
          );
        }
        wrappedElements.push(element);
      } else {
        if (inList) {
          inList = false;
          wrappedElements.push(isOrderedList ? </ol> : </ul>);
        }
        wrappedElements.push(element);
      }
    });
    
    if (inList) {
      wrappedElements.push(isOrderedList ? </ol> : </ul>);
    }
    
    return wrappedElements;
  };

  // Render inline markdown
  const renderInlineMarkdown = (text) => {
    if (!text) return text;
    
    const parts = [];
    let lastIndex = 0;
    
    // Handle links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:text-cyan-800 hover:underline font-medium"
        >
          {match[1]}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      const remaining = text.substring(lastIndex);
      
      // Handle bold and italic
      let processed = remaining;
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
      processed = processed.replace(/`([^`]+)`/g, '<code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded font-mono text-sm">$1</code>');
      
      // Convert back to React elements
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = processed;
      
      const createElementFromNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName.toLowerCase();
          const children = Array.from(node.childNodes).map(createElementFromNode);
          
          switch (tag) {
            case 'strong':
              return <strong key={Math.random()}>{children}</strong>;
            case 'em':
              return <em key={Math.random()}>{children}</em>;
            case 'code':
              const className = node.getAttribute('class') || '';
              return <code key={Math.random()} className={className}>{children}</code>;
            default:
              return node.textContent;
          }
        }
        
        return null;
      };
      
      const reactElements = Array.from(tempDiv.childNodes).map(createElementFromNode);
      parts.push(...reactElements);
    }
    
    return parts.length > 0 ? parts : text;
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
            <div key={i} className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
          ))}
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
      <p>Các dự án của toi đang/đã/sẽ thực hiện.</p>
      
      <div className='md:grid w-full mt-6 flex flex-col lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className='p-6 rounded-xl bg-slate-100 h-full cursor-pointer hover:bg-slate-200 transition-colors duration-200 group'
            onClick={() => handleRepoClick(repo)}
          >
            <div className='flex gap-2 items-center text-cyan-600 mb-2'>
              <FontAwesomeIcon icon={faBook} className="group-hover:scale-110 transition-transform" />
              <p className="font-bold truncate">{repo.name}</p>
            </div>
            
            <p className='text-sm mb-3 line-clamp-2 text-gray-700 min-h-[40px]'>
              {repo.description || "Không có mô tả"}
            </p>
            
            <div className='flex gap-2 text-sm flex-wrap items-center'>
              {repo.language && (
                <span className='inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full'>
                  {getLanguageIcon(repo.language)}
                  <span className="text-xs font-semibold">{repo.language}</span>
                </span>
              )}
              
              <span className='inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full'>
                <FontAwesomeIcon icon={faStar} className="text-xs" />
                <span className="text-xs font-semibold">{repo.stargazers_count}</span>
              </span>
              
              <span className='inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full'>
                <FontAwesomeIcon icon={faCodeBranch} className="text-xs" />
                <span className="text-xs font-semibold">{repo.forks_count}</span>
              </span>
              
              <span className='text-xs text-gray-500 ml-auto'>
                {formatDate(repo.updated_at)}
              </span>
            </div>
            
            <div className="mt-3 text-xs text-gray-400 flex items-center">
              <span className="inline-flex items-center gap-1">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                Click để xem chi tiết
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedRepo && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faBook} className="text-2xl" />
                    <h3 className="text-2xl font-bold truncate">{selectedRepo.name}</h3>
                  </div>
                  <p className="text-cyan-100 truncate">
                    {selectedRepo.description || "Không có mô tả"}
                  </p>
                </div>
                <button 
                  onClick={closePopup}
                  className="ml-4 p-2 hover:bg-cyan-800 rounded-full transition-colors"
                  aria-label="Đóng"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
              
              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mt-4">
                <a 
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  GitHub Repository
                </a>
                
                {selectedRepo.homepage && (
                  <a 
                    href={selectedRepo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    Live Website
                  </a>
                )}
                
                <div className="flex flex-wrap gap-3 ml-auto">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                    <span className="font-bold">{selectedRepo.stargazers_count}</span>
                    <span className="text-cyan-100">Stars</span>
                  </span>
                  
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <span className="font-bold">{selectedRepo.forks_count}</span>
                    <span className="text-cyan-100">Forks</span>
                  </span>
                  
                  {selectedRepo.language && (
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      {getLanguageIcon(selectedRepo.language)}
                      <span className="font-bold">{selectedRepo.language}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* README Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  README.md
                </h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Cập nhật: {formatDate(selectedRepo.updated_at)}
                </span>
              </div>
              
              {loadingReadme ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="text-4xl text-cyan-600 animate-spin mb-4" />
                  <p className="text-gray-600">Đang tải README...</p>
                </div>
              ) : readmeError ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <FontAwesomeIcon icon={faTimes} className="text-3xl text-red-500 mb-3" />
                  <h5 className="text-lg font-semibold text-red-700 mb-2">Không thể tải README</h5>
                  <p className="text-red-600 mb-4">{readmeError}</p>
                  <a 
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    Xem trực tiếp trên GitHub
                  </a>
                </div>
              ) : (
                <div className="readme-content">
                  {renderReadme(readmeContent)}
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
