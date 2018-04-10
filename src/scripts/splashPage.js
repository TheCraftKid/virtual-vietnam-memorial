import * as firebase from 'firebase';
import 'firebase/firebase-app';
import 'firebase/firebase-functions';

function fetchThumbails() {
  const getThumbnails = firebase.functions().httpsCallable('getThumbnails');
  return getThumbnails()
    .then(result => result.data.map(snap => snap.data()));
}

export default {
  fetchThumbails,
};
