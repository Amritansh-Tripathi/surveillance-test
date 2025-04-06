import mqtt from "mqtt";
import { fromEvent } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import EventEmitter from "events";
import WebSocket from "ws";

const eventEmitter = new EventEmitter();

const options = {
  clientId: `emqx_${Math.random().toString(16).substr(2, 8)}`,
  username: "admin",
  password: "public",
  keepalive: 60,
  clean: true,
  protocolVersion: 5,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};

const client = mqtt.connect('ws://192.168.128.113:8083/mqtt', options);

const unsubscribe$ = fromEvent(client, "close");

const message$ = fromEvent(client, "message").pipe(
  takeUntil(unsubscribe$),
  map(([topic, payload]) => ({
    topic,
    message: JSON.parse(payload.toString()),
  }))
);

// Function to group people by department
const groupByDepartment = (message) => {
  return message.reduce((acc, person) => {
    const department = person?.INFO?.Department || "Unknown";

    if (!acc[department]) {
      acc[department] = [];
    }

    // Avoid duplicates in the same department
    if (!acc[department].some((entry) => entry.id === person.id)) {
      acc[department].push(person);
    }

    return acc;
  }, {});
};

// Process each MQTT message and group people by department
message$.subscribe(({ topic, message }) => {
  const groupedPersonals = groupByDepartment(message);

  // Emit the grouped data along with the topic
  eventEmitter.emit("mqttMessage", { topic, groupedPersonals });
});

// WebSocket Server
const wss = new WebSocket.Server({ port: 8081 });

const clientSubscriptions = new Map(); // Track client subscriptions

// wss.on("connection", (ws) => {
//   console.log("WebSocket client connected");

//   ws.on("message", (message) => {
//     const { action, topic } = JSON.parse(message);

//     if (action === "subscribe") {
//       // Dynamically subscribe to the MQTT topic
//       client.subscribe(topic, { qos: 1 }, (err) => {
//         if (!err) {
//           console.log(`Subscribed to topic: ${topic}`);
//         } else {
//           console.error(`Subscription error for topic ${topic}:`, err);
//         }
//       });

//       // Track client subscriptions
//       if (!clientSubscriptions.has(ws)) {
//         clientSubscriptions.set(ws, new Set());
//       }
//       clientSubscriptions.get(ws).add(topic);
//       console.log(`Client subscribed to topic: ${topic}`);
//     }
//   });

//   ws.on("close", () => {
//     // Clean up subscriptions on client disconnect
//     const topics = clientSubscriptions.get(ws);
//     if (topics) {
//       topics.forEach((topic) => {
//         client.unsubscribe(topic, (err) => {
//           if (!err) {
//             console.log(`Unsubscribed from topic: ${topic}`);
//           }
//         });
//       });
//       clientSubscriptions.delete(ws);
//     }
//     console.log("WebSocket client disconnected");
//   });

//   // Forward grouped messages for subscribed topics to the WebSocket client
//   eventEmitter.on("mqttMessage", ({ topic, groupedPersonals }) => {
//     const topics = clientSubscriptions.get(ws);
//     if (topics && topics.has(topic)) {
//       ws.send(JSON.stringify({ topic, groupedPersonals }));
//     }
//   });
// });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    const { action, topic } = JSON.parse(message);

    if (action === "subscribe") {
      // Subscribe to the main topic
      client.subscribe(topic, { qos: 1 }, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error(`Subscription error for topic ${topic}:`, err);
        }
      });

      // Subscribe to the logs topic
      const logsTopic = `${topic}`;
      client.subscribe(logsTopic, { qos: 1 }, (err) => {
        if (!err) {
          console.log(`Subscribed to logs topic: ${logsTopic}`);
        } else {
          console.error(`Subscription error for logs topic ${logsTopic}:`, err);
        }
      });

      // Track client subscriptions
      if (!clientSubscriptions.has(ws)) {
        clientSubscriptions.set(ws, new Set());
      }
      clientSubscriptions.get(ws).add(topic);
      clientSubscriptions.get(ws).add(logsTopic);

      console.log(`Client subscribed to topic: ${topic} and logs topic: ${logsTopic}`);
    }
  });

  ws.on("close", () => {
    // Clean up subscriptions on client disconnect
    const topics = clientSubscriptions.get(ws);
    if (topics) {
      topics.forEach((topic) => {
        client.unsubscribe(topic, (err) => {
          if (!err) {
            console.log(`Unsubscribed from topic: ${topic}`);
          }
        });
      });
      clientSubscriptions.delete(ws);
    }
    console.log("WebSocket client disconnected");
  });

  // Forward grouped messages for subscribed topics to the WebSocket client
  eventEmitter.on("mqttMessage", ({ topic, groupedPersonals }) => {
    const topics = clientSubscriptions.get(ws);
    if (topics && topics.has(topic)) {
      ws.send(JSON.stringify({ topic, groupedPersonals }));
    }
  });
});


client.on("connect", () => console.log("MQTT server connected."));
client.on("reconnect", () => console.log("Attempting to reconnect to the MQTT server..."));
client.on("close", () => console.log("MQTT connection closed."));
client.on("offline", () => console.log("MQTT client is offline."));
client.on("error", (error) => console.error("Error occurred:", error));

export { client, eventEmitter };
