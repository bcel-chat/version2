import deepstream from 'deepstream.io-client-js'
const options = {
    reconnectIntervalIncrement: 10000,
    maxReconnectInterval: 30000,
    maxReconnectAttempts: Infinity,
    heartbeatInterval: 60000,
    rpcResponseTimeout: 100000
};

const ds = deepstream(process.env.VUE_APP_DEEPSTREAM_HOST, options)

export default ds;