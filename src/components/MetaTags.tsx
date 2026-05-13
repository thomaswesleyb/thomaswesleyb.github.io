import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  path: string;
}

const BASE_URL = 'https://thomaswesleyb.github.io';
const SITE_TITLE = 'T. Wesley Bailey';

export function MetaTags({ title, description, path }: MetaTagsProps) {
  const fullTitle = `${title} | ${SITE_TITLE}`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
