import { ObjectId, WithId } from 'mongodb';

import { database } from '@common/database/mongoConfig';
import { CreateGameMode, GameMode } from '@common/models/core';

export const gameSetupRepository = {
  findAll: async (): Promise<GameMode[]> => {
    return database.collection('gameModes').find().toArray() as unknown as GameMode[];
  },

  findById: async (id: string): Promise<GameMode | null> => {
    const gameMode = await database.collection('gameModes').findOne({
      _id: new ObjectId(id),
    });

    if (!gameMode) return null;
    return gameMode as WithId<GameMode>;
  },

  create: async (gameMode: CreateGameMode): Promise<GameMode> => {
    const gameModeObject: Partial<GameMode> = { ...gameMode };

    await database.collection('gameModes').insertOne(gameModeObject);
    return gameModeObject as GameMode;
  },

  update: async (id: string, gameMode: GameMode): Promise<GameMode | null> => {
    const gameModeObject: Partial<GameMode> = {
      name: gameMode.name,
      description: gameMode.description,
      properties: gameMode.properties,
      createdAt: gameMode.createdAt,
    };

    const updatedGameMode = await database.collection('gameModes').findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: gameModeObject }
    );
    if (!updatedGameMode) return null;

    const updatedGameModeObject = await database.collection('gameModes').findOne({
      _id: new ObjectId(id),
    });

    return updatedGameModeObject as WithId<GameMode>;
  },

  delete: async (id: string): Promise<boolean> => {
    const deletedGameMode = await database.collection('gameModes').deleteOne({ id });
    return deletedGameMode.deletedCount === 1;
  },
};
