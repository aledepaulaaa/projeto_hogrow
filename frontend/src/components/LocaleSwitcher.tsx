import { IconButton, Tooltip } from '@mui/material';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { Locales } from 'intlayer';
import { useLocale } from 'react-intlayer';

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(
      locale === Locales.PORTUGUESE ? Locales.ENGLISH : Locales.PORTUGUESE,
    );
  };

  const label = locale === Locales.PORTUGUESE ? 'EN' : 'PT';

  return (
    <Tooltip title={locale === Locales.PORTUGUESE ? 'English' : 'Portugues'}>
      <IconButton
        onClick={toggleLocale}
        id="locale-switcher"
        aria-label="Change language"
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          fontSize: '0.85rem',
          gap: 0.5,
          borderRadius: '12px',
          px: 1,
        }}
      >
        <TranslateOutlinedIcon sx={{ fontSize: '1.2rem' }} />
        {label}
      </IconButton>
    </Tooltip>
  );
}
