// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAlaWXCFrBMITUWfSknubDihuPGD1nvpHE",
    authDomain: "bean-beaver.firebaseapp.com",
    projectId: "bean-beaver",
    storageBucket: "bean-beaver.appspot.com",
    messagingSenderId: "904386219070",
    appId: "1:904386219070:web:5223416ffdda5c55a0956f"
  },
  recaptcha: {
    siteKey: '6Lc0P5MdAAAAAJ-Yw9VJJSVX1SSvVNe0IDmuflgi-',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
