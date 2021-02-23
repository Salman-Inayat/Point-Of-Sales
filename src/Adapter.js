export default class Adapter {

    // fetch for "POST" & "PUT"
    static fetchRequest(url, submissionBody, method) {
      return fetch(url, {
        Accept: "application/json",
        method: method,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(submissionBody)
      })
    }
  
    static deleteRequest(url, method) {
      return fetch(url, {
        Accept: "application/json",
        method: method,
        headers: {
          "Content-type": "application/json"
        }
      })
    }
  
  }