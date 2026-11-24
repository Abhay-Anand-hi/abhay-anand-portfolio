export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: string[];
}

export type RobotState = 'idle' | 'floating' | 'happy' | 'thinking' | 'chatting';
