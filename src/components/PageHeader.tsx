import React from 'react';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 className="mb-4 text-xl font-semibold text-white md:text-2xl flex flex-row gap-2">
        {title}
      </h1>
      {subtitle && (
        <span className="text-sm font-light text-white/50 md:text-sm">
          {subtitle}
        </span>
      )}
    </>
  );
}
