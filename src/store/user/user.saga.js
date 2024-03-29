import { takeLatest, put, all, call } from 'redux-saga/effects'

import { USER_ACTIONS_TYPES } from './user.types'

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from './user.action'

import {
    getCurrentUser,
    createUserProfileDocument,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from '../../utils/firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userSnapshot = yield call(createUserProfileDocument, userAuth, additionalData)
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenicated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password, displayName)
        yield put(signUpSuccess(user, { displayName }))
    } catch (error) {
        yield put(signUpFailed(error))
    }
}

export function* signOut() {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* signInAfterSignUp({ payload: { user, addtionalData } }) {
    yield call(getSnapshotFromUserAuth, user, addtionalData)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenicated)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTIONS_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)])
}