import axios from "axios";
import {
  CREATE_SESSION,
  GET_GODS,
  GET_GODS_FROM_LOCAL,
  UPDATE_GODS,
  GET_BOTH_GOD,
  UPDATE_GODS_TRANSLATED_DATA,
} from "./types";

import { setAlert } from "./alert";

//Create session
export const createSession = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/smiteDev/createSession");

    dispatch({
      type: CREATE_SESSION,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
    }
  }
};

//Get gods
export const getGods = (sessionId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const sessionIdObj = { sessionId: sessionId };
    const res = await axios.post("/api/smiteDev/getGods", sessionIdObj, config);

    dispatch({
      type: GET_GODS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
    }
  }
};

//Create or update god database from [abilities, god] data object
export const updateGods = (godData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const godsObj = {
      gods: godData,
    };
    const res = await axios.post("/api/smiteDev/addAll", godsObj, config);

    dispatch({
      type: UPDATE_GODS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.msg);
  }
};

//Get gods
export const getGodsFromLocal = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/smiteDev/getGodsFromLocal");

    dispatch({
      type: GET_GODS_FROM_LOCAL,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
    }
  }
};

//Get both data for a god
export const getGod = (godId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/smiteTranslate/both/${godId}`);
    dispatch({
      type: GET_BOTH_GOD,
      payload: res.data,
    });
  } catch (err) {
  }
};

//Update translate data
export const updateGodTranslatedData = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const god = {
      _id: data._id,
      name: data.name,
      title: data.title,
      pros: data.pros,
      cons: data.cons,
      type: data.type,
      lore: data.lore,
      ability1: data.ability1.id,
      ability2: data.ability2.id,
      ability3: data.ability3.id,
      ability4: data.ability4.id,
      ability5: data.ability5.id,
    };

    const abi = {
      ability1: {
        _id: data.ability1.id,
        Summary: data.ability1.summary,
        Description: {
          itemDescription: {
            description: data.ability1.desc,
          },
        },
      },
      ability2: {
        _id: data.ability2.id,
        Description: {
          Summary: data.ability2.summary,
          itemDescription: {
            description: data.ability2.desc,
          },
        },
      },
      ability3: {
        _id: data.ability3.id,
        Summary: data.ability3.summary,
        Description: {
          itemDescription: {
            description: data.ability3.desc,
          },
        },
      },
      ability4: {
        _id: data.ability4.id,
        Summary: data.ability4.summary,
        Description: {
          itemDescription: {
            description: data.ability4.desc,
          },
        },
      },
      ability5: {
        _id: data.ability5.id,
        Summary: data.ability5.summary,
        Description: {
          itemDescription: {
            description: data.ability5.desc,
          },
        },
      },
    };
    const translateObj = {
      god: god,
      abilities: abi,
      translatedBy: data.translatedBy,
    };

    console.log(translateObj);

    const res = await axios.post(
      "/api/smiteTranslate/add",
      translateObj,
      config
    );

    dispatch({
      type: UPDATE_GODS_TRANSLATED_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.msg);
  }
};
