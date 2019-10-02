import ds from 'deepstream.io-client-js';

export default ds(process.env.VUE_APP_DEEPSTREAM_HOST).login({
  user: 'admin',
  password: 'chat@12'
}, () => {

});