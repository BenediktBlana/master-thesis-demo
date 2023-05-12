import mqtt from "mqtt";

const client = mqtt.connect(`mqtt://3.73.214.233`, {
  port: 8080,
  username: "pi",
  password: "benedikt",
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
});
client.on("connect", function () {
  console.log("connected");
});

export default client;
