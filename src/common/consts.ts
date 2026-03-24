export const ENDPOINTS = {
  HEALTH_CHECK: {
    BASE: '/health-check',
  },

  GAME_SETUP: {
    BASE: '/game-modes',
    GET_GAME_MODES: '/game-modes',
    POST_GAME_MODE: '/game-modes',
    UPDATE_GAME_MODE: '/game-modes/{id}',
    GET_GAME_MODE_BY_ID: '/game-modes/{id}',

    GET_ELEMENTS_BY_GAME_MODE_ID: '/game-modes/{gameModeId}/game-elements',
  },

  GAME_ELEMENT: {
    BASE: '/game-elements',
    GET_GAME_ELEMENTS: '/game-elements',
    POST_GAME_ELEMENT: '/game-elements',
    UPDATE_GAME_ELEMENT: '/game-elements/{id}',
    GET_GAME_ELEMENT_BY_ID: '/game-elements/{id}',
  },
};
