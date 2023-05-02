import { tracker } from "../../analytics";
import { USER_ACTIONS_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTIONS_TYPES.SIGN_IN_SUCCESS:
            tracker.identify(payload.id, {
                displayName: payload.displayName,
                email: payload.email,
                createdAt: payload.createdAt,
            });
            return {
                ...state,
                currentUser: payload,
            };
        case USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
            };
        case USER_ACTIONS_TYPES.SIGN_IN_FAILURE:
        case USER_ACTIONS_TYPES.SIGN_OUT_FAILURE:
        case USER_ACTIONS_TYPES.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
};