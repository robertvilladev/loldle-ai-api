import { StatusCodes } from 'http-status-codes';

import { CreateGameElement, GameElement } from '@common/models/core';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';

import { gameElementRepository } from './gameElement.repository';

type GameElementResponse = {
  elements: GameElement[];
};

export const gameElementService = {
  findAllByGameModeId: async (gameModeId: string): Promise<ServiceResponse<GameElementResponse | null>> => {
    try {
      const gameElements = await gameElementRepository.findAllByGameModeId(gameModeId);
      if (!gameElements) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `No game elements found for game mode with id ${gameModeId}`,
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const response: GameElementResponse = { elements: gameElements };
      return new ServiceResponse<GameElementResponse>(
        ResponseStatus.Success,
        'Game elements found',
        response,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all game elements by game mode id: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findAll: async (): Promise<ServiceResponse<GameElementResponse | null>> => {
    try {
      const gameElements = await gameElementRepository.findAll();
      if (!gameElements) {
        return new ServiceResponse(ResponseStatus.Failed, 'No game elements found', null, StatusCodes.NOT_FOUND);
      }

      const response: GameElementResponse = { elements: gameElements };
      return new ServiceResponse<GameElementResponse>(
        ResponseStatus.Success,
        'Game elements found',
        response,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all game elements: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findById: async (id: string): Promise<ServiceResponse<GameElement | null>> => {
    try {
      const gameElement = await gameElementRepository.findById(id);
      if (!gameElement) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Game element with id ${id} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse<GameElement>(
        ResponseStatus.Success,
        'Game element found',
        gameElement,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding game element by id: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  create: async (gameElement: CreateGameElement): Promise<ServiceResponse<GameElement | null>> => {
    try {
      const newGameElement = await gameElementRepository.create(gameElement);
      return new ServiceResponse<GameElement>(
        ResponseStatus.Success,
        'Game element created',
        newGameElement,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating game element: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  update: async (id: string, gameElement: GameElement): Promise<ServiceResponse<GameElement | null>> => {
    try {
      const updatedGameElement = await gameElementRepository.update(id, gameElement);
      if (!updatedGameElement) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Game element with id ${id} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse<GameElement>(
        ResponseStatus.Success,
        'Game element updated',
        updatedGameElement,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating game element: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
