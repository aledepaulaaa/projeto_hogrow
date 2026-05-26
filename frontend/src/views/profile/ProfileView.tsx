import { useState } from 'react';
import { Box, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

export function ProfileView() {
  const content = useIntlayer('profile-view');
  const { user, refreshProfile } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [saving, setSaving] = useState(false);

  const initial = user?.name?.charAt(0).toUpperCase() || 'U';
  const avatarSrc = user?.avatar || '';

  const handleOpenEdit = () => {
    setEditName(user?.name || '');
    setEditPhone(user?.phone || '');
    setEditAvatar(user?.avatar || '');
    setEditAddress(user?.address || '');
    setEditOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/users/me', {
        name: editName,
        phone: editPhone,
        avatar: editAvatar,
        address: editAddress,
      });
      await refreshProfile();
      setEditOpen(false);
    } catch (err) {
      console.error('Falha ao atualizar perfil:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 600, mx: 'auto', py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.title}
        </Typography>

        <GlassCard variant="strong" sx={{ mt: 3, textAlign: 'center', py: 4 }}>
          <Avatar
            src={avatarSrc}
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              fontSize: '2rem',
              fontWeight: 700,
            }}
          >
            {!avatarSrc && initial}
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {user?.email || 'user@example.com'}
          </Typography>

          {user?.phone && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Telefone: {user.phone}
            </Typography>
          )}

          {user?.address && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Endereço: {user.address}
            </Typography>
          )}

          {user?.createdAt && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              {content.memberSince} {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          )}

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PersonOutlinedIcon />}
            id="edit-profile-button"
            onClick={handleOpenEdit}
            sx={{ mt: 3, borderRadius: '22px' }}
          >
            {content.editProfile}
          </Button>
        </GlassCard>

        {/* Modal de Edicao de Perfil */}
        <Dialog
          open={editOpen}
          onClose={() => !saving && setEditOpen(false)}
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
          <DialogTitle sx={{ fontWeight: 700 }}>Editar Perfil</DialogTitle>
          <Box component="form" onSubmit={handleSave}>
            <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <TextField
                fullWidth
                label="Nome"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                sx={{ mb: 2 }}
                slotProps={{ inputLabel: { style: { color: 'rgba(255,255,255,0.7)' } } }}
              />
              <TextField
                fullWidth
                label="Telefone (Opcional)"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                sx={{ mb: 2 }}
                slotProps={{ inputLabel: { style: { color: 'rgba(255,255,255,0.7)' } } }}
              />
              <TextField
                fullWidth
                label="Endereço (Opcional)"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                sx={{ mb: 2 }}
                slotProps={{ inputLabel: { style: { color: 'rgba(255,255,255,0.7)' } } }}
              />
              <TextField
                fullWidth
                label="URL da Foto de Perfil (Opcional)"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                sx={{ mb: 1 }}
                slotProps={{ inputLabel: { style: { color: 'rgba(255,255,255,0.7)' } } }}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setEditOpen(false)} disabled={saving} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={saving}
                sx={{ fontWeight: 600, borderRadius: '22px' }}
              >
                {saving ? <CircularProgress size={20} color="inherit" /> : 'Salvar'}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </AnimatedPage>
  );
}
