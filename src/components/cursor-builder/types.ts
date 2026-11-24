export interface CursorConfig {
  id: string;
  name: string;
  color: string;
  role: string;
  initialPos: { x: number; y: number };
}

export interface CursorState extends CursorConfig {
  x: number;
  y: number;
  activeAction: string;
  isClicking: boolean;
}

export interface ActivityLogItem {
  id: string;
  cursorName: string;
  action: string;
  timestamp: string;
  color: string;
}

export interface BuildMetrics {
  activeCursors: number;
  componentsBuilt: number;
  totalComponents: number;
  stylingOperations: number;
  animations: number;
  progress: number;
  status: 'INITIALIZING' | 'BUILDING' | 'POLISHING' | 'COMPLETED';
}
