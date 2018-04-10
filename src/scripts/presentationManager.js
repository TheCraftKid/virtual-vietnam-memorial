import * as firebase from 'firebase';
import 'firebase/firestore';
import { checkForFirebase, generateUUID } from './utils';

export function startPresentation() {
  checkForFirebase();
  // TODO: Fetch video presentation and metadata
}

/**
 * Persists the given video file to the database and uploads metadata
 * for the video.
 */
export function uploadPresentation(file, {
  presentationMetadata,
  uploaderMetadata,
  videoMetadata,
}) {
  checkForFirebase();
  const uuid = generateUUID();
  return firebase.storage().ref(`/presentations/${uuid}`)
    .put(file)
    .catch((err) => {
      console.error('Could not upload video', err);
    })
    .then((uploadSnapshot) => {
      console.log(`Upload can be found at ${uploadSnapshot.downloadURL}`);
      return firebase.firestore().collection('presentations').doc()
        .set({
          ...presentationMetadata,
          uploader: {
            ...uploaderMetadata,
          },
        });
    })
    .catch((err) => {
      console.error('Error when uploading video metadata', err);
    });
}

/**
 * Returns a list of presentations for the given period.
 *
 * @param {Number} period The class period for the presentations to fetch
 */
export function getPresentations(period) {
  return firebase.firestore()
    .collection('/presentations')
    .where('classPeriod', '==', period)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    .catch((err) => {
      console.error('Error when fetching presentations', err);
    });
}

/**
 * Fetches all the classes from the given year.
 *
 * @param {Number} year The school year with classes to fetch
 * @return A promise that resolves when the class data is fetched
 */
export function fetchClassesByYear(year) {
  return firebase.firestore()
    .collection('/classes')
    .where('period', '>', 0)
    .where('year', '==', year)
    .orderBy('period')
    .orderBy('year')
    .get()
    .then(snap => snap.docs.map(doc => doc.data()))
    .catch((err) => {
      console.error(`Error fetching classes for year ${year}`, err);
    });
}

/**
 * Fetches all the classes by ascending period order.
 */
export function fetchClasses() {
  return firebase.firestore()
    .collection('/classes')
    .where('period', '>', 0)
    .orderBy('period')
    .get()
    .then(snap => snap.docs.map(doc => doc.data()))
    .catch((err) => {
      console.error('Error when fetching classes', err);
    });
}
