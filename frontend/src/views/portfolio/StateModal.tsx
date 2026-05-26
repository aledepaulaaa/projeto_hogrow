import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, List, ListItem, ListItemText, Typography, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import type { BrazilState } from '../../types/portfolio.types';
import { getStateRegion } from './hotelData';

interface StateModalProps {
  state: BrazilState | null;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}

/**
 * Modal que exibe a lista de hoteis de um estado brasileiro.
 * Aberto ao clicar em um estado no mapa SVG.
 */
export function StateModal({ state, open, onClose, closeLabel }: StateModalProps) {
  if (!state) return null;

  const regionName = getStateRegion(state.id);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '18px',
            background: 'rgba(29, 44, 92, 0.95)',
            backdropFilter: 'blur(16px)',
            color: '#EFEFEF',
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700 }}>
        {state.name}
        <IconButton onClick={onClose} sx={{ color: '#EFEFEF' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: '#FFAA01', fontWeight: 600 }}>
          {regionName}
        </Typography>
        <List dense>
          {state.hotels.map((hotel, i) => (
            <ListItem key={i} sx={{ px: 0 }}>
              <PlaceOutlinedIcon sx={{ mr: 1, color: '#FFAA01', fontSize: 18 }} />
              <ListItemText
                primary={hotel.name}
                secondary={hotel.city}
                sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                slotProps={{
                  secondary: {
                    style: { fontSize: '0.8rem', color: 'rgba(239,239,239,0.6)' }
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="secondary" sx={{ fontWeight: 600, borderRadius: '22px' }}>
          {closeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
