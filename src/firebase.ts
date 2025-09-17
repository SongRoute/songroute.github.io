import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: https://firebase.google.com/docs/web/setup?hl=ko
// 가이드에 따라 firebase config를 설정합니다.
const firebaseConfig = {
  // Firebase 프로젝트 설정이 필요합니다
  // apiKey: "your-api-key",
  // authDomain: "your-project.firebaseapp.com",
  // databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
  // projectId: "your-project-id",
  // storageBucket: "your-project.appspot.com",
  // messagingSenderId: "123456789",
  // appId: "your-app-id"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(firebaseApp);
