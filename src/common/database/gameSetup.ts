import { ObjectId } from 'mongodb';

import { countriesDataset } from '@modules/gameElement/datasets/gameElement.dataset';
import { gameModesDataset } from '@modules/gameSetup/dataset/gameModes.dataset';
import { logger } from '@src/server';

import { database } from './mongoConfig';

export const seedGameModes = async () => {
  try {
    // delete all game modes
    await database.collection('gameModes').deleteMany({});

    const gameModes = await database.collection('gameModes').find().toArray();
    if (gameModes.length === 0) {
      await database.collection('gameModes').insertMany(gameModesDataset);
      const createdGameModes = await database.collection('gameModes').find().toArray();
      const [primaryModeId] = createdGameModes.map((gameMode) => gameMode._id);
      await seedGameElements(primaryModeId);
    }
  } catch (err) {
    logger.error(`Error seeding game modes: ${(err as Error).message}`);
  }
};

const seedGameElements = async (gameModeId: ObjectId) => {
  // delete all game elements
  await database.collection('gameElements').deleteMany({});

  try {
    const gameElements = await database.collection('gameElements').find().toArray();
    if (gameElements.length === 0) {
      await database.collection('gameElements').insertMany(
        countriesDataset.map((country) => ({
          ...country,
          gameModeId,
        }))
      );
    }
  } catch (err) {
    logger.error(`Error seeding game elements: ${(err as Error).message}`);
  }
};
