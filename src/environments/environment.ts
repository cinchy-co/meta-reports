import {CinchyConfig} from '@cinchy-co/angular-sdk';

// ng serve --port 3000

// PROD LOCAL
/*const cinchyConfig: CinchyConfig = {
  authority: 'https://cinchy.net/cinchysso',
  cinchyRootUrl: 'https://cinchy.net/Cinchy',
  clientId: 'deals-sheet',
  redirectUri: 'https://localhost:3000/deals-overview'
};*/

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
  clientId: 'dynamic-charts-local',
  redirectUri: 'http://localhost:4200/'
};*/

const cinchyConfig: CinchyConfig = {
  authority: 'https://cinchy.net/cinchysso',
  cinchyRootUrl: 'https://cinchy.net/Cinchy',
  clientId: 'dynamic-charts-local',
  redirectUri: 'https://localhost:4200/'
};

export const environment = {
  production: false,
  cinchyConfig
};
