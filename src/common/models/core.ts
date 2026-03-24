import { z } from 'zod';

import {
  ZodCreateGameElementSchema,
  ZodElementPropertyTypeSchema,
  ZodElementPropertyVariantByType,
  ZodGameElementSchema,
} from '@modules/gameElement/gameElement.model';
import {
  ZodCreateGameModeSchema,
  ZodCreateGameSessionSchema,
  ZodGameModeSchema,
  ZodGameSessionSchema,
} from '@modules/gameSetup/gameSetup.model';

// Represents a game mode (e.g., "Primary Mode", "Time Attack")
export type GameMode = z.infer<typeof ZodGameModeSchema>;
export type CreateGameMode = z.infer<typeof ZodCreateGameModeSchema>;

// Represents an element to guess (e.g., a game character, movie, etc.)
export type GameElement = z.infer<typeof ZodGameElementSchema>;
export type CreateGameElement = z.infer<typeof ZodCreateGameElementSchema>;

// Represents a property of an element (e.g., "Name", "Release Date")
export type GameElementPropertyType = z.infer<typeof ZodElementPropertyTypeSchema>;
// Represents a variant of a property type (e.g., "Text", "URL")
export type GameElementPropertyVariantByType = typeof ZodElementPropertyVariantByType;

// Represents an active game session
export type GameSession = z.infer<typeof ZodGameSessionSchema>;
export type CreateGameSession = z.infer<typeof ZodCreateGameSessionSchema>;
