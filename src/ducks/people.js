import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {all, put, call, take, takeEvery} from 'redux-saga/effects'
import {generateId, fbDatatoEntities} from './utils'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {reset} from 'redux-form'

const ReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null
})

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`


export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_REQUEST:
        case ADD_PERSON_REQUEST:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbDatatoEntities(payload, PersonRecord))

        case ADD_PERSON_SUCCESS:
            return state
                .set('loading', false)
                .update('entities', entities => entities.set(payload.uid, new PersonRecord(payload)))

        default:
            return state
    }
}

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const peopleListSelector = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
))

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export function fetchAll() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export const fetchAllSaga = function * () {
    while (true) {
        yield take(FETCH_ALL_REQUEST)

        const ref = firebase.database().ref('people')

        const data = yield call([ref, ref.once], 'value')

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}

export const addPersonSaga = function * (action) {
    const id = yield call(generateId)

    const ref = firebase.database().ref('people/' + id)

    yield call([ref, ref.set], action.payload)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {uid: id.toString(), ...action.payload}
    })

    yield put(reset('person'))
}

/*
export function addPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload: {
                person: {id: Date.now(), ...person}
            }
        })
    }
}
*/

export const saga = function * () {
    yield all([
        fetchAllSaga(),
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
    ])
}
