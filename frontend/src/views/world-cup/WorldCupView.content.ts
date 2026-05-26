import { t, type Dictionary } from 'intlayer';

const worldCupContent = {
  key: 'world-cup-view',
  content: {
    heroLine1: t({ pt: 'Vem torcer com a', en: 'Come cheer with' }),
    heroHighlight1: t({ pt: 'HoGrow', en: 'HoGrow' }),
    heroLine2: t({ pt: 'pelo nosso', en: 'for our' }),
    heroHighlight2: t({ pt: 'Brasil', en: 'Brazil' }),
    heroLine3: t({ pt: 'na', en: 'in the' }),
    heroHighlight3: t({ pt: 'Copa do Mundo 2026', en: 'World Cup 2026' }),
    spinsAvailable: t({ pt: 'Giros disponiveis', en: 'Spins available' }),
    reservation: t({ pt: 'Inserir Reserva', en: 'Submit Reservation' }),
    reservationNumber: t({ pt: 'Numero da Reserva', en: 'Reservation Number' }),
    checkIn: t({ pt: 'Check-in', en: 'Check-in' }),
    checkOut: t({ pt: 'Check-out', en: 'Check-out' }),
    guestName: t({ pt: 'Nome do Hospede Principal', en: 'Main Guest Name' }),
    hotel: t({ pt: 'Hotel', en: 'Hotel' }),
    submitReservation: t({ pt: 'Registrar Reserva', en: 'Submit Reservation' }),
    playRoulette: t({ pt: 'Girar Roleta', en: 'Spin Roulette' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default worldCupContent;
