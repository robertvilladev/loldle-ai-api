import { CreateGameMode } from '@common/models/core';

export const gameModesDataset: CreateGameMode[] = [
  {
    name: 'Countries Finder',
    description: 'Find the country using the given data that each try provides you.',
    properties: [
      'name',
      'population',
      'territory_km2',
      'continent',
      'gdp_trillions',
      'flag',
      'inflation_percent',
      /* 'leader', */
    ],
    propertiesToDisplay: ['name', 'flag'],
  },
];
