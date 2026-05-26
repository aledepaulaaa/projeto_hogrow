import { useState } from 'react';
import { Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';

/**
 * Pagina de Chat HoGrow V2.
 * Interface de chat para comunicacao direta com a equipe HoGrow.
 * TODO: Integrar com WebSocket/polling no backend.
 */
export function ChatView() {
  const content = useIntlayer('chat-view');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isAdmin: boolean; time: string }>>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { text: message, isAdmin: false, time: new Date().toLocaleTimeString() },
    ]);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 700, mx: 'auto', py: 2, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.title as any}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {content.subtitle as any}
        </Typography>

        {/* Area de mensagens */}
        <GlassCard variant="strong" sx={{ flex: 1, overflow: 'auto', p: 2, mb: 2, minHeight: 300 }}>
          {messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 8 }}>
              {content.noMessages as any}
            </Typography>
          ) : (
            messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: msg.isAdmin ? 'flex-start' : 'flex-end',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    bgcolor: msg.isAdmin ? 'rgba(29,44,92,0.3)' : 'rgba(255,170,1,0.2)',
                    borderRadius: '14px',
                    px: 2, py: 1,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                </Box>
              </Box>
            ))
          )}
        </GlassCard>

        {/* Input de mensagem */}
        <TextField
          fullWidth id="chat-input"
          placeholder={String(content.placeholder)}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{ input: { endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend} color="secondary" edge="end">
                <SendOutlinedIcon />
              </IconButton>
            </InputAdornment>
          )}}}
        />
      </Box>
    </AnimatedPage>
  );
}
