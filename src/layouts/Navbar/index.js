import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const aboutIcon = (
    <svg className='w-5 h-5 text-yellow-500 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path
        fillRule='evenodd'
        d='M15.5 3.3a1 1 0 0 0-1.4 0l-2 2h.1l6.5 6.5 2-1.9c.4-.4.4-1 0-1.4l-5.2-5.2ZM7 8.3l3.9-1.5 6.3 6.3-1.5 3.9a1 1 0 0 1-.6.6l-9.5 3.3a1 1 0 0 1-1-.1l6.5-6.5A1 1 0 0 0 9.7 13l-6.5 6.4a1 1 0 0 1-.1-1L6.4 9c.1-.3.3-.5.6-.6Z'
        clipRule='evenodd'
      />
    </svg>
  );

  const projectIcon = (
    <svg className='w-5 h-5 text-purple-600 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path
        fillRule='evenodd'
        d='M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z'
        clipRule='evenodd'
      />
    </svg>
  );

  const gameIcon = (
    <svg className='w-5 h-5 text-emerald-600 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path fillRule='evenodd' d='M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z' clipRule='evenodd' />
      <path fillRule='evenodd' d='M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.4 0 .7 0 1 .2V5a2 2 0 0 0-2-2H5Zm4 10H3v2c0 1.1.9 2 2 2h4v-4Z' clipRule='evenodd' />
    </svg>
  );

  const donateIcon = (
    <svg className='w-5 h-5 text-red-500 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path d='m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z' />
    </svg>
  );

  const contactIcon = (
    <svg className='w-5 h-5 text-blue-600 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.5a6 6 0 0 0-5.5 3.5l-1 2.1a1 1 0 0 0 1.8.8l1-2a4 4 0 0 1 3.6-2.4h.6v2a1 1 0 0 0 1.6.8l4-3a1 1 0 0 0 0-1.6l-4-3A1 1 0 0 0 13 5v1ZM8.9 13c0-1-.7-2-1.7-2.5A2.4 2.4 0 0 0 4 12.4v.2c-.1 1 .3 1.8 1 2.3l3.7 3a7 7 0 0 0 4.2 1.4H17a3 3 0 0 0 3-3v-4h-2v4c0 .6-.4 1-1 1h-3.9a5 5 0 0 1-3-1l-3.7-3-.4-.4Z' />
    </svg>
  );

  const statusIcon = (
    <svg className='w-5 h-5 text-green-500 translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
      <path fillRule='evenodd' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' clipRule='evenodd' />
    </svg>
  );

  const navLinks = [
    { path: '/', label: 'About', icon: aboutIcon },
    { path: '/games', label: 'Games', icon: gameIcon },
    { path: '/projects', label: 'Projects', icon: projectIcon },
    { path: '/donate', label: 'Donate', icon: donateIcon },
    { path: '/contact', label: 'Contact', icon: contactIcon },
  ];

  return (
    <div className='flex md:p-2 pb-8 py-2 px-5 md:rounded-xl bg-white shadow-sm md:mt-3 md:border-none'>
      <style>{`
        @keyframes slideGradient {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .nav-active {
          background: linear-gradient(-45deg, #00d4ff, #0099cc, #00d4ff);
          background-size: 300% 100%;
          animation: slideGradient 0.8s ease-in-out;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 153, 204, 0.3);
        }

        .nav-item {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-item:hover:not(.nav-active) {
          background-color: rgba(34, 211, 238, 0.8);
        }

        .nav-external {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-external:hover {
          background-color: rgba(34, 211, 238, 0.8);
        }
      `}</style>
      
      <div className='flex gap-3 text-neutral-800 font-bold text-base flex-wrap'>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            <div
              className={`nav-item flex gap-1 px-3 py-[2px] rounded-md ${
                isActive(link.path)
                  ? 'nav-active text-white shadow-xl scale-110'
                  : 'bg-cyan-200 text-neutral-800'
              }`}
            >
              {link.label} {link.icon}
            </div>
          </Link>
        ))}
        
        <a href='https://status.minhsoora.site' target='_blank' rel='noopener noreferrer'>
          <div className='nav-external flex gap-1 px-3 py-[2px] rounded-md bg-cyan-200 text-neutral-800'>
            Status {statusIcon}
          </div>
        </a>
      </div>
    </div>
  );
}

export default Nav;
