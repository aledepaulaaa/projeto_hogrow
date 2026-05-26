import axios from 'axios';

export function handleApiError(error: unknown, content: any): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return String(content.network);
    }
    
    const status = error.response.status;
    const data = error.response.data;

    // Treat specific 400 cases (e.g. email exists)
    if (status === 400 && data && data.message) {
      const msg = Array.isArray(data.message) ? data.message[0] : data.message;
      if (typeof msg === 'string' && msg.toLowerCase().includes('already registered')) {
        return String(content.emailExists);
      }
    }

    switch (status) {
      case 400:
        return String(content['400']);
      case 401:
        return String(content['401']);
      case 403:
        return String(content['403']);
      case 404:
        return String(content['404']);
      case 500:
        return String(content['500']);
      default:
        return String(content.default);
    }
  }

  return String(content.default);
}
