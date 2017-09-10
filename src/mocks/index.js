import conferences from './conferences'
import people from './people'
import firebase from 'firebase'

export function saveEventsToFB() {
    const eventsRef = firebase.database().ref('/events')
    const peopleRef = firebase.database().ref('/people')

    conferences.forEach(conference  => eventsRef.push(conference))
    people.forEach(person  => peopleRef.push(person))
}

window.runMigration = function() {
    firebase.database().ref('/events').once('value', data => {
        if (!data.val()) saveEventsToFB()
    })

  firebase.database().ref('/people').once('value', data => {
    if (!data.val()) saveEventsToFB()
  })
}