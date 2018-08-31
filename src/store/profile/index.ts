import { ProfileModel } from 'api/modules/profile'
import { Action } from 'redux'
import { thunk } from 'store'

interface GetProfile extends Action {
  type: 'GET_PROFILE'
}
interface ReceiveProfile extends Action {
  type: 'RECEIVE_PROFILE'
  payload: ProfileModel
}
interface GetProfileError extends Action {
  type: 'GET_PROFILE_ERROR'
  payload: [string]
}
interface UpdateProfile extends Action {
  type: 'UPDATE_PROFILE'
}
interface ReceiveProfileUpdate extends Action {
  type: 'RECEIVE_PROFILE_UPDATE'
  payload: ProfileModel
}
interface UpdateProfileError extends Action {
  type: 'UPDATE_PROFILE_ERROR'
  payload: [string]
}
interface UploadProfileImage extends Action {
  type: 'UPLOAD_PROFILE_IMAGE'
}
interface UploadProfileImageComplete extends Action {
  type: 'UPLOAD_PROFILE_IMAGE_COMPLETE'
  payload: string
}
interface UpdateEmail extends Action {
  type: 'UPDATE_EMAIL'
}
interface UpdateEmailError extends Action {
  type: 'UPDATE_EMAIL_ERROR'
}

interface OnTextChangeProfile extends Action {
  type: 'ON_TEXT_CHANGE_PROFILE'
  payload: {
    name: string
    value: string
  }
}

export type ProfileActions =
  | GetProfile
  | ReceiveProfile
  | GetProfileError
  | UpdateProfile
  | ReceiveProfileUpdate
  | UpdateProfileError
  | UploadProfileImage
  | UploadProfileImageComplete
  | UpdateEmailError
  | UpdateEmail
  | UpdateEmailError
  | OnTextChangeProfile

export interface ProfileState {
  name: string
  image: string | null
  loading: boolean
  errors: Array<string>
  id: string
}

export const getProfile = (userId: string) => {
  return thunk(async (dispatch, _, api) => {
    dispatch({ type: 'GET_PROFILE' })

    try {
      const profile = await api.modules.profile.getProfile(userId)

      dispatch(receiveProfile(profile))
    } catch (err) {
      dispatch(getProfileError(err))
    }
  })
}

export const receiveProfile = (profile: ProfileModel): ReceiveProfile => {
  return {
    type: 'RECEIVE_PROFILE',
    payload: profile
  }
}

export const getProfileError = (errors: [string]): GetProfileError => {
  return {
    type: 'GET_PROFILE_ERROR',
    payload: errors
  }
}

export const updateProfile = () => {
  return thunk(async (dispatch, getState, api) => {
    const token = getState().auth.token
    const { image, name } = getState().profile

    if (token) {
      dispatch({ type: 'UPDATE_PROFILE' })

      const new_profile = await api.modules.profile.update(
        {
          image: image || '',
          name,
          id: ''
        },
        token
      )

      dispatch(receiveProfile(new_profile))
    }
  })
}

export const receiveProfileUpdate = (profile: ProfileModel): ReceiveProfile => {
  return {
    type: 'RECEIVE_PROFILE',
    payload: profile
  }
}

export const uploadProfileImage = (file: File) => {
  return thunk(async (dispatch, _, api) => {
    dispatch({ type: 'UPLOAD_PROFILE_IMAGE' })

    const res = await api.modules.image.uploadImages<{ profileImage: string }>({
      profileImage: file
    })

    dispatch(uploadComplete(res.profileImage))
    dispatch(updateProfile())
  })
}

const uploadComplete = (image: string): UploadProfileImageComplete => {
  return {
    type: 'UPLOAD_PROFILE_IMAGE_COMPLETE',
    payload: image
  }
}

export const onChange = (name: string, value: string): OnTextChangeProfile => {
  return {
    type: 'ON_TEXT_CHANGE_PROFILE',
    payload: {
      name,
      value
    }
  }
}

export const initialState: ProfileState = {
  name: '',
  image: null,
  loading: false,
  errors: [],
  id: ''
}

export const reducer = (
  state: ProfileState = initialState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
    case 'ON_TEXT_CHANGE_PROFILE':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case 'GET_PROFILE':
      return {
        ...state,
        loading: true
      }

    case 'GET_PROFILE_ERROR':
      return {
        ...state,
        loading: false,
        errors: action.payload
      }

    case 'RECEIVE_PROFILE':
      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        loading: true
      }

    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        loading: false,
        errors: action.payload
      }

    case 'UPLOAD_PROFILE_IMAGE':
      return {
        ...state,
        loading: true
      }

    case 'UPLOAD_PROFILE_IMAGE_COMPLETE':
      return {
        ...state,
        loading: false,
        image: action.payload
      }

    default:
      return state
  }
}
