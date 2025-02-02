import { ObjectId, WithId } from 'mongodb';

import { database } from '@common/database/mongoConfig';
import { CreateGameElement, GameElement } from '@common/models/core';

export const gameElementRepository = {
  findAll: async (): Promise<GameElement[]> => {
    return database.collection('gameElements').find().toArray() as unknown as GameElement[];
  },

  findById: async (id: string): Promise<GameElement | null> => {
    const gameElement = await database.collection('gameElements').findOne({
      _id: new ObjectId(id),
    });

    if (!gameElement) return null;
    return gameElement as WithId<GameElement>;
  },

  create: async (gameElement: CreateGameElement): Promise<GameElement> => {
    const gameElementObject: Partial<GameElement> = { ...gameElement };

    await database.collection('gameElements').insertOne(gameElementObject);
    return gameElementObject as GameElement;
  },

  update: async (id: string, gameElement: GameElement): Promise<GameElement | null> => {
    const gameElementObject: Partial<GameElement> = {
      name: gameElement.name,
      properties: gameElement.properties,
      gameModeId: gameElement.gameModeId,
    };

    const updatedGameElement = await database.collection('gameElements').findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: gameElementObject }
    );
    if (!updatedGameElement) return null;

    const updatedGameElementObject = await database.collection('gameElements').findOne({
      _id: new ObjectId(id),
    });

    return updatedGameElementObject as WithId<GameElement>;
  },

  delete: async (id: string): Promise<boolean> => {
    const deletedGameElement = await database.collection('gameElements').deleteOne({ id });
    return deletedGameElement.deletedCount === 1;
  },

  findAllByGameModeId: async (gameModeId: string): Promise<GameElement[]> => {
    const gameElements = await database
      .collection('gameElements')
      .find({ gameModeId: new ObjectId(gameModeId) })
      .toArray();
    return gameElements as GameElement[];
  },
};
