export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: GameCategory;
  description: string;
}

export enum GameCategory {
  ACTION = 'ACTION',
  ARCADE = 'ARCADE',
  PUZZLE = 'PUZZLE',
  SPORTS = 'SPORTS',
  RETRO = 'RETRO',
  HORROR = 'HORROR'
}

export type ViewState = {
  activeGameId: string | null;
  searchQuery: string;
  selectedCategory: GameCategory | 'ALL';
};