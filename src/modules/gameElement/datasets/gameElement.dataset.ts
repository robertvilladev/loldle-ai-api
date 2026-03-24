import { GameElement } from '@common/models/core';

export const countriesDataset: Partial<GameElement>[] = [
  {
    name: 'United States',
    properties: {
      population: { type: 'number', value: 331000000, variant: 'number' },
      territory_km2: { type: 'number', value: 9834000, variant: 'number' },
      continent: { type: 'string', value: 'North America', variant: 'text' },
      gdp_trillions: { type: 'number', value: 23.3, variant: 'number' },
      flag: { type: 'string', value: '🇺🇸', variant: 'text' },
      inflation_percent: { type: 'number', value: 3.4, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Joe Biden' },
  },
  {
    name: 'Germany',
    properties: {
      population: { type: 'number', value: 83000000, variant: 'number' },
      territory_km2: { type: 'number', value: 357000, variant: 'number' },
      continent: { type: 'string', value: 'Europe', variant: 'text' },
      gdp_trillions: { type: 'number', value: 4.3, variant: 'number' },
      flag: { type: 'string', value: '🇩🇪', variant: 'url' },
      inflation_percent: { type: 'number', value: 2.1, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Olaf Scholz' },
  },
  {
    name: 'Japan',
    properties: {
      population: { type: 'number', value: 125800000, variant: 'number' },
      territory_km2: { type: 'number', value: 377975, variant: 'number' },
      continent: { type: 'string', value: 'Asia', variant: 'text' },
      gdp_trillions: { type: 'number', value: 5.0, variant: 'number' },
      flag: { type: 'string', value: '🇯🇵', variant: 'url' },
      inflation_percent: { type: 'number', value: 1.1, variant: 'percentage' },
    },
  },
  {
    name: 'Brazil',
    properties: {
      population: { type: 'number', value: 213000000, variant: 'number' },
      territory_km2: { type: 'number', value: 8515767, variant: 'number' },
      continent: { type: 'string', value: 'South America', variant: 'text' },
      gdp_trillions: { type: 'number', value: 2.0, variant: 'number' },
      flag: { type: 'string', value: '🇧🇷', variant: 'url' },
      inflation_percent: { type: 'number', value: 4.7, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Luiz Inácio Lula da Silva' },
  },
  {
    name: 'India',
    properties: {
      population: { type: 'number', value: 1393000000, variant: 'number' },
      territory_km2: { type: 'number', value: 3287263, variant: 'number' },
      continent: { type: 'string', value: 'Asia', variant: 'text' },
      gdp_trillions: { type: 'number', value: 3.7, variant: 'number' },
      flag: { type: 'string', value: '🇮🇳', variant: 'url' },
      inflation_percent: { type: 'number', value: 5.2, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Narendra Modi' },
  },
  {
    name: 'Australia',
    properties: {
      population: { type: 'number', value: 26000000, variant: 'number' },
      territory_km2: { type: 'number', value: 7692024, variant: 'number' },
      continent: { type: 'string', value: 'Oceania', variant: 'text' },
      gdp_trillions: { type: 'number', value: 1.8, variant: 'number' },
      flag: { type: 'string', value: '🇦🇺', variant: 'url' },
      inflation_percent: { type: 'number', value: 3.2, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Anthony Albanese' },
  },
  {
    name: 'South Africa',
    properties: {
      population: { type: 'number', value: 60000000, variant: 'number' },
      territory_km2: { type: 'number', value: 1221037, variant: 'number' },
      continent: { type: 'string', value: 'Africa', variant: 'text' },
      gdp_trillions: { type: 'number', value: 0.4, variant: 'number' },
      flag: { type: 'string', value: '🇿🇦', variant: 'url' },
      inflation_percent: { type: 'number', value: 5.6, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Cyril Ramaphosa' },
  },
  {
    name: 'Russia',
    properties: {
      population: { type: 'number', value: 146000000, variant: 'number' },
      territory_km2: { type: 'number', value: 17098242, variant: 'number' },
      continent: { type: 'string', value: 'Europe/Asia', variant: 'text' },
      gdp_trillions: { type: 'number', value: 1.7, variant: 'number' },
      flag: { type: 'string', value: '🇷🇺', variant: 'url' },
      inflation_percent: { type: 'number', value: 6.0, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Vladimir Putin' },
  },
  {
    name: 'United Kingdom',
    properties: {
      population: { type: 'number', value: 67000000, variant: 'number' },
      territory_km2: { type: 'number', value: 243610, variant: 'number' },
      continent: { type: 'string', value: 'Europe', variant: 'text' },
      gdp_trillions: { type: 'number', value: 3.1, variant: 'number' },
      flag: { type: 'string', value: '🇬🇧', variant: 'url' },
      inflation_percent: { type: 'number', value: 2.3, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Rishi Sunak' },
  },
  {
    name: 'China',
    properties: {
      population: { type: 'number', value: 1402000000, variant: 'number' },
      territory_km2: { type: 'number', value: 9596961, variant: 'number' },
      continent: { type: 'string', value: 'Asia', variant: 'text' },
      gdp_trillions: { type: 'number', value: 17.8, variant: 'number' },
      flag: { type: 'string', value: '🇨🇳', variant: 'url' },
      inflation_percent: { type: 'number', value: 1.6, variant: 'percentage' },
    },
    //leader: { type: 'string', value: 'Xi Jinping' },
  },
];
