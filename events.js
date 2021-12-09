// Native events
const EVENT_CONNECTION = "connection";
const EVENT_DISCONNECT = "disconnect";

// Server to client events
const EVENT_FRIEND_CONNECTION = "friendConnection";
const EVENT_FRIEND_DISCONNECTION = "friendDisconnection";
const EVENT_FRIEND_LOCATIONS = "friendLocations";
const EVENT_FRIEND_LOCATION_UPDATE = "friendLocationUpdate";
const EVENT_PING = "ping";
const EVENT_PING_ACCEPTED = "pingAccepted";
const EVENT_MESSAGE = "message";

// Client to server events
const EVENT_UPDATE_NAME = "updateName";
const EVENT_UPDATE_LOCATION = "updateLocation";
const EVENT_QUERY_FRIEND_LOCATIONS = "queryFriendLocations";
const EVENT_PING_FRIEND = "pingFriend";
const EVENT_ACCEPT_PING = "acceptPing";
const EVENT_SEND_MESSAGE = "sendMessage";

module.exports = {
  EVENT_CONNECTION,
  EVENT_DISCONNECT,
  EVENT_FRIEND_CONNECTION,
  EVENT_FRIEND_DISCONNECTION,
  EVENT_FRIEND_LOCATIONS,
  EVENT_FRIEND_LOCATION_UPDATE,
  EVENT_PING,
  EVENT_PING_ACCEPTED,
  EVENT_MESSAGE,
  EVENT_UPDATE_NAME,
  EVENT_UPDATE_LOCATION,
  EVENT_QUERY_FRIEND_LOCATIONS,
  EVENT_PING_FRIEND,
  EVENT_ACCEPT_PING,
  EVENT_SEND_MESSAGE,
};
