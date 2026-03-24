import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { ENDPOINTS } from '@common/consts';
import { handleServiceResponse } from '@common/utils/httpHandlers';

import { ZodGameModeSchema } from './gameSetup.model';
import { gameSetupService } from './gameSetup.service';

export const gameSetupRegistry = new OpenAPIRegistry();
gameSetupRegistry.register('GameMode', ZodGameModeSchema);

export const gameSetupRouter: Router = (() => {
  const router = Router();
  const { GET_GAME_MODES, POST_GAME_MODE, GET_ELEMENTS_BY_GAME_MODE_ID } = ENDPOINTS.GAME_SETUP;

  // --- GET /gameModes/{gameModeId}/game-elements
  gameSetupRegistry.registerPath({
    method: 'get',
    tags: ['Game Modes'],
    path: `${GET_ELEMENTS_BY_GAME_MODE_ID}`,
    request: {
      params: z.object({
        gameModeId: z.string(),
      }),
    },
    responses: createApiResponse(z.array(ZodGameModeSchema), 'Success'),
  });
  router.get('/:gameModeId/game-elements', async (req, res) => {
    const gameModeId = req.params.gameModeId;
    const serviceResponse = await gameSetupService.findAllGameElementsByGameModeId(gameModeId);
    handleServiceResponse(serviceResponse, res);
  });

  // --- GET /gameModes ---
  gameSetupRegistry.registerPath({
    method: 'get',
    tags: ['Game Modes'],
    path: `${GET_GAME_MODES}`,
    responses: createApiResponse(z.array(ZodGameModeSchema), 'Success'),
  });
  router.get('/', async (_req, res) => {
    const serviceResponse = await gameSetupService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  // --- POST /gameModes ---
  gameSetupRegistry.registerPath({
    method: 'post',
    tags: ['Game Modes'],
    path: `${POST_GAME_MODE}`,
    request: {
      body: {
        content: {
          'application/json': {
            schema: ZodGameModeSchema,
          },
        },
        description: 'Game mode to create',
      },
    },
    responses: createApiResponse(ZodGameModeSchema, 'Success'),
  });
  router.post('', async (req, res) => {
    const serviceResponse = await gameSetupService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
