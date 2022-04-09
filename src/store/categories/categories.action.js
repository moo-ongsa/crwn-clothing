import { CATEGORIES_ACTIONS_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

export const fetchCategoriesFailed = () =>
    createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED)

export const fetchCategoriesAsync = () => async (dispatch) => {
    try {
        const categoriesArray = await getCategoriesAndDocument('categories')
        dispatch(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}
