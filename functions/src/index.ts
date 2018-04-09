import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';

const THUMBNAIL_LIMIT = 10;

export const getThumbnails = functions.https.onCall((data, context: CallableContext) => {
  const classObject = data['class'];
  let query: FirebaseFirestore.Query;
  if (classObject) {
    query = admin.firestore().collection('presentations')
      .where('period', '==', classObject.period);
  } else {
    query = admin.firestore().collection('presentations');
  }
  return query.limit(THUMBNAIL_LIMIT).get()
    .then((snapshots) => snapshots.docs.map((snap) => {
      const presentation = snap.data();
      return presentation.thumbnailUrl;
    })).catch((err) => {
      console.error('Error when fetching thumbnails', err);
      return new HttpsError('internal',
        'The function encountered a server error when fetching thumbnails');
    });
});