import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faBook, faFile, faFileArchive, faQuestion, faStar, faCodeBranch, faExternalLinkAlt, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";

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
      setReadmeError("");
      setReadmeContent("");
      
      // Cách 1: Dùng raw URL để lấy plain text
      const rawUrl = `https://raw.githubusercontent.com/minhsoora/${repoName}/main/README.md`;
      const response = await fetch(rawUrl);
      
      if (response.ok) {
        const text = await response.text();
        setReadmeContent(text);
      } else {
        // Thử branch master nếu main không có
        const rawUrlMaster = `https://raw.githubusercontent.com/minhsoora/${repoName}/master/README.md`;
        const responseMaster = await fetch(rawUrlMaster);
        
        if (responseMaster.ok) {
          const text = await responseMaster.text();
          setReadmeContent(text);
        } else {
          // Thử dùng GitHub API
          const apiResponse = await fetch(`https://api.github.com/repos/minhsoora/${repoName}/readme`);
          
          if (apiResponse.ok) {
            const data = await apiResponse.json();
            
            if (data.content && data.encoding === "base64") {
              // Decode base64 content
              const decodedContent = atob(data.content);
              setReadmeContent(decodedContent);
            } else {
              throw new Error("Không thể decode README content");
            }
          } else {
            throw new Error(`README không tồn tại hoặc không thể truy cập`);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeError(error.message);
      setReadmeContent("# README không khả dụng\n\n" + error.message + "\n\n[View Repository on GitHub](" + (selectedRepo?.html_url || "#") + ")");
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
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Hàm render README với format đẹp
  const renderReadme = (content) => {
    if (!content) return <div className="text-gray-500 italic">Không có nội dung README</div>;
    
    // Xử lý markdown đơn giản
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let listDepth = 0;
    
    lines.forEach((line, index) => {
      // Xử lý code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
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
      
      // Xử lý tiêu đề
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
      
      // Xử lý danh sách
      if (line.match(/^[\s]*[-*+]\s/)) {
        const depth = line.match(/^[\s]*/)[0].length;
        const content = line.replace(/^[\s]*[-*+]\s/, '');
        
        if (depth > listDepth) {
          listDepth = depth;
          elements.push(<ul key={`ul-start-${index}`} className="list-disc ml-6 my-2">);
        } else if (depth < listDepth) {
          listDepth = depth;
          elements.push(</ul>);
        }
        
        elements.push(
          <li key={`li-${index}`} className="my-1 text-gray-700">
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }
      
      // Xử lý danh sách số
      if (line.match(/^[\s]*\d+\.\s/)) {
        elements.push(
          <li key={`oli-${index}`} className="my-1 text-gray-700 list-decimal ml-6">
            {renderInlineMarkdown(line.replace(/^[\s]*\d+\.\s/, ''))}
          </li>
        );
        return;
      }
      
      // Reset list depth cho dòng không phải list item
      if (!line.match(/^[\s]*[-*+]\s/) && !line.match(/^[\s]*\d+\.\s/) && listDepth > 0) {
        listDepth = 0;
        elements.push(</ul>);
      }
      
      // Xử lý horizontal rule
      if (line.match(/^[-*_]{3,}$/)) {
        elements.push(<hr key={`hr-${index}`} className="my-6 border-t border-gray-300" />);
        return;
      }
      
      // Xử lý dòng trống
      if (line.trim() === '') {
        elements.push(<br key={`br-${index}`} />);
        return;
      }
      
      // Xử lý dòng thông thường
      elements.push(
        <p key={index} className="my-3 text-gray-800 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
    
    // Đóng ul nếu còn mở
    if (listDepth > 0) {
      elements.push(</ul>);
    }
    
    return elements;
  };

  // Hàm xử lý inline markdown (links, bold, italic, code)
  const renderInlineMarkdown = (text) => {
    if (!text) return text;
    
    const parts = [];
    let lastIndex = 0;
    
    // Xử lý links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      parts.push(
        <a
          key={match.index}
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
      const remainingText = text.substring(lastIndex);
      
      // Xử lý inline code `code`
      const codeParts = [];
      let codeLastIndex = 0;
      const codeRegex = /`([^`]+)`/g;
      let codeMatch;
      
      while ((codeMatch = codeRegex.exec(remainingText)) !== null) {
        if (codeMatch.index > codeLastIndex) {
          codeParts.push(remainingText.substring(codeLastIndex, codeMatch.index));
        }
        
        codeParts.push(
          <code key={`code-${codeMatch.index}`} className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded font-mono text-sm">
            {codeMatch[1]}
          </code>
        );
        
        codeLastIndex = codeMatch.index + codeMatch[0].length;
      }
      
      if (codeLastIndex < remainingText.length) {
        codeParts.push(remainingText.substring(codeLastIndex));
      }
      
      // Xử lý bold **text** và *italic*
      const styledParts = codeParts.flatMap(part => {
        if (typeof part === 'string') {
          const boldItalicParts = [];
          let biLastIndex = 0;
          
          // Xử lý cả **bold** và *italic*
          const biRegex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
          let biMatch;
          
          while ((biMatch = biRegex.exec(part)) !== null) {
            if (biMatch.index > biLastIndex) {
              boldItalicParts.push(part.substring(biLastIndex, biMatch.index));
            }
            
            const content = biMatch[1];
            if (content.startsWith('**')) {
              boldItalicParts.push(
                <strong key={`bold-${biMatch.index}`} className="font-bold text-gray-900">
                  {content.slice(2, -2)}
                </strong>
              );
            } else {
              boldItalicParts.push(
                <em key={`italic-${biMatch.index}`} className="italic">
                  {content.slice(1, -1)}
                </em>
              );
            }
            
            biLastIndex = biMatch.index + biMatch[0].length;
          }
          
          if (biLastIndex < part.length) {
            boldItalicParts.push(part.substring(biLastIndex));
          }
          
          return boldItalicParts;
        }
        return part;
      });
      
      parts.push(...styledParts);
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
                <div className="readme-container">
                  {renderReadme(readmeContent)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles cho README */}
      <style jsx>{`
        .readme-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif;
          line-height: 1.7;
          color: #374151;
        }
        
        .readme-container h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0e7490;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid #a5f3fc;
        }
        
        .readme-container h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0891b2;
          margin-top: 1.75rem;
          margin-bottom: 1rem;
        }
        
        .readme-container h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #06b6d4;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .readme-container p {
          margin-bottom: 1rem;
          color: #4b5563;
        }
        
        .readme-container ul, .readme-container ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        
        .readme-container li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        
        .readme-container ul {
          list-style-type: disc;
        }
        
        .readme-container ol {
          list-style-type: decimal;
        }
        
        .readme-container pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          border: 1px solid #374151;
        }
        
        .readme-container pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
          font-size: inherit;
        }
        
        .readme-container code:not(pre code) {
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
          background-color: #f3f4f6;
          color: #dc2626;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          border: 1px solid #e5e7eb;
        }
        
        .readme-container blockquote {
          border-left: 4px solid #06b6d4;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background-color: #f0f9ff;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #374151;
          font-style: italic;
        }
        
        .readme-container a {
          color: #0891b2;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .readme-container a:hover {
          color: #0e7490;
          text-decoration: underline;
        }
        
        .readme-container img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          border: 1px solid #e5e7eb;
        }
        
        .readme-container table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .readme-container th {
          background-color: #f8fafc;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .readme-container td {
          padding: 0.75rem 1rem;
          color: #4b5563;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .readme-container tr:last-child td {
          border-bottom: none;
        }
        
        .readme-container tr:hover {
          background-color: #f9fafb;
        }
        
        .readme-container hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .readme-container h1 {
            font-size: 1.75rem;
          }
          
          .readme-container h2 {
            font-size: 1.375rem;
          }
          
          .readme-container h3 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Projects;
