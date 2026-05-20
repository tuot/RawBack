export const openWindowMessageType = 'rawback:open-window';

export interface OpenWindowMessage {
  type: typeof openWindowMessageType;
  url: string;
}

export function createOpenWindowMessage(url: string): OpenWindowMessage {
  return {
    type: openWindowMessageType,
    url,
  };
}

export function isOpenWindowMessage(value: unknown): value is OpenWindowMessage {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<OpenWindowMessage>;
  return candidate.type === openWindowMessageType && typeof candidate.url === 'string' && isHttpUrl(candidate.url);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
