import { t, type Dictionary } from 'intlayer';

const chatContent = {
  key: 'chat-view',
  content: {
    title: t({ pt: 'Chat HoGrow', en: 'HoGrow Chat' }),
    subtitle: t({ pt: 'Comunicacao direta com a equipe HoGrow', en: 'Direct communication with the HoGrow team' }),
    placeholder: t({ pt: 'Digite sua mensagem...', en: 'Type your message...' }),
    send: t({ pt: 'Enviar', en: 'Send' }),
    noMessages: t({ pt: 'Nenhuma mensagem ainda. Inicie uma conversa!', en: 'No messages yet. Start a conversation!' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default chatContent;
