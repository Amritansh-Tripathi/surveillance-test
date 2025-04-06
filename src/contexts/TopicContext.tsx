"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface Message {
  id: string;
  INFO?: { Department?: string };
}

interface GroupedPersonal {
  [department: string]: Message[];
}

interface TopicData {
  topicName: string;
  groupedPersonals: GroupedPersonal;
}

interface TopicContextType {
  topics: TopicData[];
  groupedPersonals: GroupedPersonal;
  subscribeToTopic: (topic: string) => void;
  selectTopic: (topicName: string) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider: React.FC = ({ children }) => {
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [groupedPersonals, setGroupedPersonals] = useState<GroupedPersonal>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Update or set topic data
  const updateTopicData = (topicName: string, newGroupedPersonals: GroupedPersonal) => {
    setTopics((prevTopics) => {
      const topicIndex = prevTopics.findIndex((topic) => topic.topicName === topicName);
      if (topicIndex !== -1) {
        const updatedTopics = [...prevTopics];
        updatedTopics[topicIndex] = { topicName, groupedPersonals: newGroupedPersonals };
        console.log(`Updated topic data for: ${topicName}`);
        return updatedTopics;
      } else {
        console.log(`Added new topic data for: ${topicName}`);
        return [...prevTopics, { topicName, groupedPersonals: newGroupedPersonals }];
      }
    });

    setGroupedPersonals((prevGroupedPersonals) => ({
      ...prevGroupedPersonals,
      ...newGroupedPersonals,
    }));
  };

  const subscribeToTopic = (topic: string) => {
    console.log(`Trying to subscribe to topic: ${topic}`);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "subscribe", topic }));
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.warn(`WebSocket not ready. Queuing subscription for: ${topic}`);
      const interval = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ action: "subscribe", topic }));
          console.log(`Delayed subscription sent for topic: ${topic}`);
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const selectTopic = (topicName: string) => {
    console.log(`Selected topic: ${topicName}`);
    setSelectedTopic(topicName);
    subscribeToTopic(topicName);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.128.113:8081"); // Update with your WebSocket server address
    setSocket(ws);

    ws.onopen = () => {
      console.log("✅ WebSocket connection established.");
      if (selectedTopic) {
        ws.send(JSON.stringify({ action: "subscribe", topic: selectedTopic }));
        console.log(`🔁 Re-subscribed to topic: ${selectedTopic}`);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { topic, groupedPersonals } = data;
        console.log("📨 Received WebSocket message:", data);
        updateTopicData(topic, groupedPersonals);
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.warn("⚠️ WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("🚨 WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [selectedTopic]); // Ensure re-run on topic change

  return (
    <TopicContext.Provider value={{ topics, groupedPersonals, subscribeToTopic, selectTopic }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopicContext must be used within a TopicProvider");
  }
  return context;
};
