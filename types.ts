export enum ViewState {
  HOME = 'HOME',
  AI_LAB = 'AI_LAB'
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface RiskAssessment {
  riskLevel: string;
  summary: string;
  keyRisks: string[];
  mitigation: string;
}

export interface TechRecommendation {
  venueType: string;
  essentials: string[];
  advanced: string[];
  estimatedCrewSize: number;
}

export interface TeamStructure {
  role: string;
  count: number;
  description: string;
}

export interface TeamBuilderResult {
  squadName: string;
  strategy: string;
  roles: TeamStructure[];
}
