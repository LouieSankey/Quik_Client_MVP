import config from './config'

const APIService = {

  getAccountByEmail(credentials) {

    return fetch(`${config.API_ENDPOINT}/user_route/email/${credentials.email}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials),
      }).then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
    },

    getAccountById(id) {

      return fetch(`${config.API_ENDPOINT}/user_route/${id}`, {
          method: 'GET'
       
         
        }).then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()

          }).catch(err => {
            console.log(err)
          })
      },

createUser(user) {
    return fetch(`${config.API_ENDPOINT}/user_route`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
 }

}

export default APIService
