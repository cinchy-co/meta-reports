import {CinchyConfig} from '@cinchy-co/angular-sdk';

// ng serve --port 3000

// ng build --prod --base-href "/dx/dynamic-charts/"
// PROD LOCAL
const cinchyConfig: CinchyConfig = {
  authority: 'https://cinchy.net/cinchysso',
  cinchyRootUrl: 'https://cinchy.net/Cinchy',
  clientId: 'dynamic-charts',
  redirectUri: 'https://dx.cinchy.net/dx/dynamic-charts'
};

// QA LOCAL
/*const cinchyConfig: CinchyConfig = {
  // The url of your Cinchy IdentityServer
  authority: 'http://qa.cinchy.co/cinchy-4.7_buildno-1816-ci/cinchysso',
  // The root url of your Cinchy instance
  cinchyRootUrl: 'http://qa.cinchy.co/cinchy-4.7_BuildNo-1816-CI/Cinchy',  // The redirect url after logging in
  // The client id for your applet
  clientId: 'kpmg-charts',
  redirectUri: 'http://localhost:4200/'
};*/

/*
// QA
const cinchyConfig: CinchyConfig = {
  // The url of your Cinchy IdentityServer
  authority: 'http://qa.cinchy.co/cinchy-4.7_buildno-1816-ci/cinchysso',
  // The root url of your Cinchy instance
  cinchyRootUrl: 'http://qa.cinchy.co/cinchy-4.7_BuildNo-1816-CI/Cinchy',  // The redirect url after logging in
  // The client id for your applet
  clientId: 'deals-sheet-alvin',
  redirectUri: 'http://qa.cinchy.co/cinchy-4.7_BuildNo-1816-CI/dx/deals-overview/deals-overview'
};*/

// Actual Prod
/*const cinchyConfig: CinchyConfig = {
  authority: 'http://pilot.cinchy.co/transfer_pricing/cinchysso',
  cinchyRootUrl: 'http://pilot.cinchy.co/Transfer_Pricing/Cinchy/',
  clientId: 'dynamic-charts',
  redirectUri: 'http://pilot.cinchy.co/Transfer_Pricing/dashboard'
};*/

export const environment = {
  production: false,
  cinchyConfig
};
