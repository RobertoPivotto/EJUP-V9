import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Interface para os dados dos patrocinadores
export interface Sponsor {
  id: number;
  name: string;
  image: string;
  link: string;
}

interface ColumnSponsorsProps {
  sponsors: Sponsor[];
  title?: string;
}

const ColumnSponsors = ({ sponsors, title = "Patrocinadores" }: ColumnSponsorsProps) => {
  const [page, setPage] = useState(0);
  const sponsorsPerPage = 2;
  const totalPages = Math.ceil(sponsors.length / sponsorsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentSponsors = sponsors.slice(page * sponsorsPerPage, page * sponsorsPerPage + sponsorsPerPage);

  return (
    <div className="bg-zinc-800/30 rounded-lg border border-zinc-700/50 p-6">
      <h3 className="text-xl font-serif font-semibold mb-4 border-b border-zinc-700 pb-2 text-center">
        {title}
      </h3>
      <div className="flex flex-col gap-6 items-center justify-center min-h-[220px]">
        {currentSponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.link}
            className="flex items-center justify-center w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 border border-zinc-700/50 w-full min-h-[112px] h-28">
              <img
                src={sponsor.image.startsWith('/') ? sponsor.image : `/lovable-uploads/logos/${sponsor.image}`}
                alt={sponsor.name}
                className="h-24 w-auto mx-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-zinc-400 transition-all ${page === idx ? 'bg-white' : 'bg-zinc-700'}`}
            onClick={() => setPage(idx)}
            aria-label={`Página ${idx + 1}`}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/creator"
          className="text-xs text-ejup-pink hover:underline"
        >
          Saiba como patrocinar
        </Link>
      </div>
    </div>
  );
};

export default ColumnSponsors; 