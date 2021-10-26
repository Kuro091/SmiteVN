import {
  CREATE_SESSION,
  GET_GODS,
  UPDATE_GODS,
  GET_GODS_FROM_LOCAL,
  GET_BOTH_GOD,
  UPDATE_GODS_TRANSLATED_DATA,
  CLEAR_GOD_LOCAL
} from "../actions/types";

const initialState = {
  sessionId: "",
  gods: {},
  god: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_SESSION:
      return {
        ...state,
        sessionId: payload.session_id,
      };
    case GET_GODS:
    case GET_GODS_FROM_LOCAL:
      return {
        ...state,
        gods: payload,
      };
    case GET_BOTH_GOD:
      return {
        ...state,
        god: payload,
      };
      case CLEAR_GOD_LOCAL:
        return {
          ...state,
          god: {}
        }
    case UPDATE_GODS:
    case UPDATE_GODS_TRANSLATED_DATA:
    default:
      return state;
  }
}
