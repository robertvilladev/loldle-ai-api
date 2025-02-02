import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { ZodGameElementSchema } from '@modules/gameElement/gameElement.model';

extendZodWithOpenApi(z);

// GameMode model
export const ZodGameModeSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  properties: z.array(z.string()),
  description: z.string().default(''),
  createdAt: z.date().default(new Date()),
  propertiesToDisplay: z.array(z.string()),
});

export const ZodCreateGameModeSchema = ZodGameModeSchema.omit({
  _id: true,
  createdAt: true,
});

// Game session model
export const ZodGameSessionSchema = z.object({
  // Session Game  model
  // hintsUsed: z.number(),
  // hints: z.array(z.string()),
  _id: z.instanceof(ObjectId).optional(),
  attempts: z.number().default(0),
  gameMode: ZodGameModeSchema,

  sessionId: z.string(),
  isSolved: z.boolean().default(false),
  targetElement: ZodGameElementSchema,
  targetsList: z.array(ZodGameElementSchema),

  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const ZodCreateGameSessionSchema = ZodGameSessionSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  isSolved: true,
  attempts: true,
  targetElement: true,
  targetsList: true,
});
