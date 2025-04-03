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

    // Update the groupedPersonals state
    setGroupedPersonals((prevGroupedPersonals) => ({
      ...prevGroupedPersonals,
      ...newGroupedPersonals,
    }));
  };

  // Subscribe to a topic
  const subscribeToTopic = (topic: string) => {
    console.log(`Subscribed to topic: ${topic}`);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "subscribe", topic }));
    }
  };

  // Handle topic selection
  const selectTopic = (topicName: string) => {
    setSelectedTopic(`${topicName}`);
    console.log(`Selected topic: ${topicName}`);
    subscribeToTopic(topicName);
  };

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://192.168.179.113:8081"); // Replace with your WebSocket server URL
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      if (selectedTopic) {
        ws.send(JSON.stringify({ action: "subscribe", topic: selectedTopic }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { topic, groupedPersonals } = data;

        // Update topic data in context
        updateTopicData(topic, groupedPersonals);
        console.log("Received WebSocket message:", data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, [selectedTopic]);

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
