import { DeepstreamClient } from "@deepstream/client";
const options = {
  reconnectIntervalIncrement: 1000,
  maxReconnectInterval: 30000,
  maxReconnectAttempts: Infinity,
  heartbeatInterval: 60000,
  rpcResponseTimeout: 100000
};

const ds = new DeepstreamClient(process.env.VUE_APP_DEEPSTREAM_HOST, options);

export default ds;
