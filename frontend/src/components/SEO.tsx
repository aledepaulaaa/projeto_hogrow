import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = 'HoGrow - Copa do Mundo 2026',
  description = 'Vem torcer com a HoGrow pelo nosso Brasil na Copa do Mundo 2026. Participe e ganhe prêmios exclusivos para redes hoteleiras!',
  keywords = 'HoGrow, Hotéis, Copa do Mundo 2026, Prêmios, Roleta, B2B, Turismo',
  image = 'https://hogrow.com/favicon.svg',
  url = 'https://hogrow.com/',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
