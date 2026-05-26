import { useState } from 'react';
import {
  Box, TextField, Button, MenuItem, Select,
  FormControl, InputLabel, Alert, Grid,
} from '@mui/material';
import { useIntlayer } from 'react-intlayer';
import { PARTNER_LOGOS } from '../portfolio/logos';
import api from '../../services/api';

/**
 * Formulario de insercao de reserva.
 * Campos: numero da reserva, check-in, check-out, hospede principal, regiao (dropdown), hotel (dropdown).
 */
export function ReservationForm() {
  const content = useIntlayer('world-cup-view');

  const [reservationNumber, setReservationNumber] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [region, setRegion] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [success, setSuccess] = useState(false);

  const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  // Lista de hoteis filtrados por regiao em ordem alfabetica
  const filteredHotels = PARTNER_LOGOS
    .filter((p) => !region || p.region === region)
    .map((p) => `${p.name} (${p.state})`)
    .sort((a, b) => a.localeCompare(b));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users/reservations', {
        reservationNumber,
        checkIn,
        checkOut,
        guestName,
        hotelName,
      });
      setSuccess(true);
      setReservationNumber('');
      setCheckIn('');
      setCheckOut('');
      setGuestName('');
      setHotelName('');
      setRegion('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Falha ao registrar reserva:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>
          Reserva registrada com sucesso!
        </Alert>
      )}

      <TextField
        fullWidth id="reservation-number"
        label={content.reservationNumber as any}
        value={reservationNumber} onChange={(e) => setReservationNumber(e.target.value)}
        required sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth id="reservation-checkin" type="date"
          label={content.checkIn as any} value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth id="reservation-checkout" type="date"
          label={content.checkOut as any} value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <TextField
        fullWidth id="reservation-guest"
        label={content.guestName as any}
        value={guestName} onChange={(e) => setGuestName(e.target.value)}
        required sx={{ mb: 2 }}
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="region-label">Região</InputLabel>
            <Select
              labelId="region-label"
              id="reservation-region"
              value={region}
              label="Região"
              onChange={(e) => {
                setRegion(e.target.value);
                setHotelName(''); // Limpa o hotel ao mudar de região
              }}
            >
              <MenuItem value="">Todas as Regiões</MenuItem>
              {regions.map((r) => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="hotel-label">{content.hotel as any}</InputLabel>
            <Select
              labelId="hotel-label" id="reservation-hotel"
              value={hotelName} label={content.hotel as any}
              onChange={(e) => setHotelName(e.target.value)}
            >
              {filteredHotels.length === 0 ? (
                <MenuItem value="" disabled>Nenhum hotel encontrado</MenuItem>
              ) : (
                filteredHotels.map((h) => (
                  <MenuItem key={h} value={h}>{h}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        fullWidth type="submit" variant="contained" color="secondary" size="large"
        sx={{ py: 1.5, fontWeight: 700, boxShadow: '0 4px 20px rgba(255,170,1,0.3)' }}
      >
        {content.submitReservation as any}
      </Button>
    </Box>
  );
}
