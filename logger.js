const format = require("date-fns/format");

const DATE_TIME_FORMAT = "d/M/Y H:mm:ss";

function logEvent(socketId, eventName) {
  console.log(
    `${format(
      Date.now(),
      DATE_TIME_FORMAT
    )} SOCKET: ${socketId} EVENT: ${eventName}`
  );
}

function logEventWithParams(socketId, eventName, parameters) {
  console.log(
    `${format(
      Date.now(),
      DATE_TIME_FORMAT
    )} SOCKET: ${socketId} EVENT: ${eventName} PARAMETERS: ${JSON.stringify(
      parameters
    )}`
  );
}

module.exports = {
  logEvent,
  logEventWithParams,
};
