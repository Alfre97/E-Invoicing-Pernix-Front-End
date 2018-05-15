// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rootURL: 'http://localhost:5000',
  //rootURL: 'https://dry-harbor-97946.herokuapp.com',

  addService: '/addService',
  getServices: '/getServices',
  addEmitter: '/addUser',
  getEmitters: '/getEmitters',
  getReceivers: '/getReceivers',
  sendInvoice: '/uploadInvoice',
  addTax: '/addTax',
  getTaxes: '/getTaxes',
  getCodes: '/getCodes',
  addCode: '/addCode',
  getNotLinkedTaxes: '/getNotLinkedTaxes',
  getNotLinkedCodes: '/getNotLinkedCodes'
};
