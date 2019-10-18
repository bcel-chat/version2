import ds from 'deepstream.io-client-js';

const options = {
  reconnectIntervalIncrement: 10000,
  maxReconnectInterval: 30000,
  maxReconnectAttempts: Infinity,
  heartbeatInterval: 60000,
  rpcResponseTimeout: 100000
};

export default ds(process.env.VUE_APP_DEEPSTREAM_HOST, options).login({
  user: 'admin',
  password: 'chat@12'
}, () => {

});