
export enum AppState {
  Landing = 'LANDING',
  Quiz = 'QUIZ',
  Results = 'RESULTS',
}

export enum ResultType {
  DramaMagnet = 'DRAMA_MAGNET',
  EscapeArtist = 'ESCAPE_ARTIST',
  Perfectionist = 'PERFECTIONIST',
  SelfSacrificer = 'SELF_SACRIFICER',
}

export interface QuizOption {
  text: string;
  resultType: ResultType;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface QuizResult {
  title: string;
  description: string;
  psychology: string;
  nextStep: string;
}

export type Answers = Record<number, ResultType>;