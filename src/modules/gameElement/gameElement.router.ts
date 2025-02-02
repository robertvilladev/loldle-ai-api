import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { ENDPOINTS } from '@common/consts';
import { handleServiceResponse } from '@common/utils/httpHandlers';

import { ZodGameElementSchema } from './gameElement.model';
import { gameElementService } from './gameElement.service';

export const gameElementRegistry = new OpenAPIRegistry();
gameElementRegistry.register('GameElement', ZodGameElementSchema);

export const gameElementRouter: Router = (() => {
  const router = Router();
  const { GET_GAME_ELEMENTS, BASE } = ENDPOINTS.GAME_ELEMENT;

  // --- GET /gameElements ---
  gameElementRegistry.registerPath({
    method: 'get',
    tags: ['Game Elements'],
    path: `${BASE}${GET_GAME_ELEMENTS}`,
    responses: createApiResponse(z.array(ZodGameElementSchema), 'Success'),
  });
  router.get(GET_GAME_ELEMENTS, async (_req, res) => {
    const serviceResponse = await gameElementService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  // --- POST /gameElements ---
  gameElementRegistry.registerPath({
    method: 'post',
    tags: ['Game Elements'],
    path: `${BASE}${GET_GAME_ELEMENTS}`,
    request: {
      body: {
        content: {
          'application/json': {
            schema: ZodGameElementSchema,
          },
        },
        description: 'Game element to create',
      },
    },
    responses: createApiResponse(ZodGameElementSchema, 'Success'),
  });
  router.post(GET_GAME_ELEMENTS, async (req, res) => {
    const serviceResponse = await gameElementService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
