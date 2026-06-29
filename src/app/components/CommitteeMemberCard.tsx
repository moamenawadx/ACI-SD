import { useState } from 'react';
import { Users } from 'lucide-react';
import type { CommitteeMember } from '../data/committees';

interface CommitteeMemberCardProps {
  image?: CommitteeMember['image'];
  name: CommitteeMember['name'];
  role?: CommitteeMember['role'];
  institution?: CommitteeMember['institution'];
  country: CommitteeMember['country'];
}

export function CommitteeMemberCard({
  image = '/committee-portrait.svg',
  name,
  role,
  institution,
  country
}: CommitteeMemberCardProps) {
  const fallbackImage = '/committee-portrait.svg';
  const [imageSrc, setImageSrc] = useState(image || fallbackImage);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex h-full w-full flex-col items-center rounded-[20px] border border-slate-200/80 bg-white px-6 py-8 text-center shadow-[0_14px_34px_rgba(10,38,71,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#2CA6C4]/40 hover:shadow-[0_22px_48px_rgba(30,115,168,0.16)]">
      <div className="mb-5 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-slate-200 bg-[#F7FAFC] shadow-[0_12px_28px_rgba(10,38,71,0.16)]">
        {imageError ? (
          <Users className="w-10 h-10 text-slate-300" />
        ) : (
          <img
            src={imageSrc}
            alt={`${name} profile photo`}
            className="h-full w-full rounded-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            loading="lazy"
            onError={() => {
              setImageSrc(fallbackImage);
              setImageError(true);
            }}
          />
        )}
      </div>

      <h3 className="text-base font-bold leading-snug text-[#0A2647]">{name}</h3>

      {role && (
        <span className="mt-2 inline-block rounded-full bg-[#2CA6C4]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#1E73A8]">
          {role}
        </span>
      )}

      {institution && institution.length > 0 && (
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{institution}</p>
      )}

      {country && country.length > 0 && (
        <div className="mt-auto pt-5">
          <span className="inline-block rounded-full border border-slate-200 bg-[#F7FAFC] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0A2647]/80">
            {country}
          </span>
        </div>
      )}
    </article>
  );
}
