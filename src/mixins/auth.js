import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import settings from 'settings'

import FB from 'src/firebase'
const state = {
  authUser: null,
  isAuthenticated: false,
  isCheckingAuth: false
}

const auth0 = new Auth0(settings.auth0)
const lock = new Auth0Lock(settings.auth0.clientID, settings.auth0.domain, {
  allowSignup: false,
  allowForgotPassword: false
})

lock.on('authenticated', authResult => {
  localStorage.setItem(settings.authAccessToken, authResult.accessToken)
  localStorage.setItem(settings.authToken, authResult.idToken)
  getProfile()
})

const setAuth = payload => {
  if (payload) {
    localStorage.setItem(settings.authProfile, JSON.stringify(payload))
    state.authUser = payload
  } else {
    try {
      state.authUser = JSON.parse(localStorage.getItem(settings.authProfile))
    } catch (e) {
      state.authUser = null
    }
  }
  state.isAuthenticated = !!state.authUser
  state.isCheckingAuth = false
}

const login = () => {
  lock.show()
}

const logout = () => {
  FB.firebase.auth().signOut().then(() => {
    localStorage.clear()
    window.location.href = '/'
  }).catch(console.error)
}

const getProfile = () => {
  const accessToken = localStorage.getItem(settings.authAccessToken)
  const token = localStorage.getItem(settings.authToken)
  if (!accessToken || !token) return

  state.isCheckingAuth = true
  lock.getUserInfo(accessToken, (err, profile) => {
    if (err) {
      console.info(err)
      logout()
      return
    }

    const payload = {
      email: profile.email,
      name: profile.name,
      nickname: profile.nickname,
      picture: profile.picture,
      userId: profile.user_id
    }

    const options = {
      id_token: token,
      api: 'firebase',
      scope: 'openid name email displayName',
      target: settings.auth0.clientID
    }

    // Make a call to the Auth0 '/delegate'
    auth0.getDelegationToken(options, (err, result) => {
      if (!err) {
        // Exchange the delegate token for a Firebase auth token
        FB.firebase.auth().signInWithCustomToken(result.id_token).catch(console.error).then(() => {
          const userRef = FB.db.ref('users/' + profile.user_id)
          userRef.once('value').then(snap => {
            snap = snap.val()
            if (!snap) {
              userRef.set(payload)
              setAuth(payload)
            } else {
              setAuth(snap)
            }
            userRef.on('value', snap => setAuth(snap.val()))
          })
        })
      } else {
        logout()
      }
    })
  })
}

// initialize it all
setAuth()
if (state.isAuthenticated) {
  getProfile()
}

const AuthMixin = {
  data: () => state,
  methods: {
    login,
    logout
  }
}

export default AuthMixin
