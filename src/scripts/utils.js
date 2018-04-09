import * as firebase from 'firebase';

/**
 * Ensures that the `firebase` object has an app associated.
 * Should never throw error in normal circumstances.
 */
export function checkForFirebase() {
  if (firebase.app == null) {
    throw new Error('FirebaseApp not initialized');
  }
}

export function generateUUID() {
  return Math.floor((Math.random() + 1) * 0x10000)
    .toString(16)
    .substring(1);
}
