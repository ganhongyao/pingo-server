// Server to client events
const EVENT_FRIEND_CONNECTION = "friendConnection";
const EVENT_FRIEND_DISCONNECTION = "friendDisconnection";
const EVENT_FRIEND_LOCATIONS = "friendLocations";
const EVENT_FRIEND_LOCATION_UPDATE = "friendLocationUpdate";

// Client to server events
const EVENT_UPDATE_NAME = "updateName";
const EVENT_UPDATE_LOCATION = "updateLocation";
const EVENT_QUERY_FRIEND_LOCATIONS = "queryFriendLocations";

module.exports = {
  EVENT_FRIEND_CONNECTION,
  EVENT_FRIEND_DISCONNECTION,
  EVENT_FRIEND_LOCATIONS,
  EVENT_FRIEND_LOCATION_UPDATE,
  EVENT_UPDATE_NAME,
  EVENT_UPDATE_LOCATION,
  EVENT_QUERY_FRIEND_LOCATIONS,
};