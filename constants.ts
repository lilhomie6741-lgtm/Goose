import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    thumbnail: 'https://picsum.photos/seed/cookie/300/200',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    category: GameCategory.ARCADE,
    description: 'Bake an absurd amount of cookies in this classic idle game.'
  },
  {
    id: 'fnae',
    title: "Five Nights at Epstein's",
    thumbnail: 'https://picsum.photos/seed/island/300/200',
    url: 'https://scratch.mit.edu/projects/embed/1039871141',
    category: GameCategory.HORROR,
    description: 'Survival horror parody. Can you survive the night on the island?'
  },
  {
    id: 'slope',
    title: 'Slope',
    thumbnail: 'https://picsum.photos/seed/slope/300/200',
    url: 'https://kdata1.com/2020/05/slope/',
    category: GameCategory.ARCADE,
    description: 'An intense fast-paced 3D platformer. Roll down the neon slope, avoid obstacles, and don’t fall off!'
  },
  {
    id: 'kart-bros',
    title: 'Kart Bros',
    thumbnail: 'https://picsum.photos/seed/kart/300/200',
    url: 'https://kart-bros.com/',
    category: GameCategory.SPORTS,
    description: 'High-speed racing action with the bros. Drift to win!'
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    thumbnail: 'https://picsum.photos/seed/baseball/300/200',
    url: 'https://baseballbros.io/',
    category: GameCategory.SPORTS,
    description: 'Step up to the plate and hit those home runs.'
  },
  {
    id: 'basket-bros',
    title: 'Basket Bros',
    thumbnail: 'https://picsum.photos/seed/basket/300/200',
    url: 'https://basketbros.io/',
    category: GameCategory.SPORTS,
    description: 'Fast-paced 1v1 basketball. Dunk on your friends!'
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    thumbnail: 'https://picsum.photos/seed/random/300/200',
    url: 'https://basket-random.com/',
    category: GameCategory.SPORTS,
    description: 'Physics-based basketball where everything is random.'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    thumbnail: 'https://picsum.photos/seed/retrobowl/300/200',
    url: 'https://game316009.konggames.com/gameplayer.php?g=316009',
    category: GameCategory.SPORTS,
    description: 'The perfect game for the armchair quarterback. Manage your team and lead them to glory!'
  }
];

export const CATEGORIES = Object.values(GameCategory);