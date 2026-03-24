import { StatusCodes } from 'http-status-codes';

import { CreateGameMode, GameElement, GameMode } from '@common/models/core';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { gameElementRepository } from '@modules/gameElement/gameElement.repository';
import { logger } from '@src/server';

import { gameSetupRepository } from './gameSetup.repository';

type GameModeResponse = {
  modes: GameMode[];
};

export const gameSetupService = {
  findAll: async (): Promise<ServiceResponse<GameModeResponse | null>> => {
    try {
      const gameModes = await gameSetupRepository.findAll();
      if (!gameModes) {
        return new ServiceResponse(ResponseStatus.Failed, 'No game modes found', null, StatusCodes.NOT_FOUND);
      }

      const response: GameModeResponse = { modes: gameModes };
      return new ServiceResponse<GameModeResponse>(
        ResponseStatus.Success,
        'Game modes found',
        response,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all game modes: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findById: async (id: string): Promise<ServiceResponse<GameMode | null>> => {
    try {
      const gameMode = await gameSetupRepository.findById(id);
      if (!gameMode) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Game mode with id ${id} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse<GameMode>(ResponseStatus.Success, 'Game mode found', gameMode, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding game mode by id: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  create: async (gameMode: CreateGameMode): Promise<ServiceResponse<GameMode | null>> => {
    try {
      const newGameMode = await gameSetupRepository.create(gameMode);
      return new ServiceResponse<GameMode>(
        ResponseStatus.Success,
        'Game mode created',
        newGameMode,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating game mode: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  update: async (id: string, gameMode: GameMode): Promise<ServiceResponse<GameMode | null>> => {
    try {
      const updatedGameMode = await gameSetupRepository.update(id, gameMode);
      if (!updatedGameMode) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Game mode with id ${id} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse<GameMode>(
        ResponseStatus.Success,
        'Game mode updated',
        updatedGameMode,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating game mode: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findAllGameElementsByGameModeId: async (
    gameModeId: string
  ): Promise<ServiceResponse<{ gameMode: GameMode; gameElements: GameElement[] } | null>> => {
    try {
      const gameMode = await gameSetupService.findById(gameModeId);
      if (gameMode.statusCode !== StatusCodes.OK) {
        const errorMessage = `Error finding game mode by id: ${gameMode.message}`;
        logger.error(errorMessage);
        return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      const gameElements = await gameElementRepository.findAllByGameModeId(gameModeId);
      if (!gameElements.length || !gameMode.response) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Game elements for game mode with id ${gameModeId} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return new ServiceResponse<{ gameMode: GameMode; gameElements: GameElement[] }>(
        ResponseStatus.Success,
        'Game elements found',
        { gameMode: gameMode.response, gameElements },
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding game mode by id: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
