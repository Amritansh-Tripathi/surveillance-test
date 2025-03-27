import React, { useEffect, useState } from "react";
import { useTopicContext } from "@/contexts/TopicContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LiveCaptionsProps {
  CameraName: string;
  topicName: string | null;
}

const LiveCaptions: React.FC<LiveCaptionsProps> = ({ CameraName, topicName }) => {
  const { groupedPersonals, subscribeToTopic } = useTopicContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topicName) {
      setLoading(false);
      return;
    }

    const logsTopic = `${topicName}/logs`;
    subscribeToTopic(logsTopic);
    setLoading(false);
  }, [topicName]);

  const formatCaption = (entry: any) => {
    const time = new Date(entry?.TimeStamp);
    const location = CameraName ? `at ${CameraName}` : "in the monitored area";

    if (entry.Type === "Personal") {
      return {
        text: `👤 ${entry.INFO?.Name || "An employee"} entered ${location} at ${time}. Role: ${entry.INFO?.Role || "Unknown"}.`,
        color: "text-blue-400",
      };
    } else if (entry.Type === "Visitor") {
      return {
        text: `🚶‍♂️ A visitor, ${entry.INFO?.Name || "Unknown"}, arrived at the ${entry.INFO?.Department || "entrance"} (${CameraName}) at ${time}. Purpose: ${entry.INFO?.purpose || "Not specified"}.`,
        color: "text-orange-400",
      };
    } else if (entry.Name === "UNKNOWN") {
      return {
        text: `⚠️ An unidentified person was spotted ${location} at ${time}.`,
        color: "text-red-400",
      };
    } else if (entry.class === "vehicle") {
      return {
        text: `🚗 A vehicle (${entry.INFO?.Vehicle || "Unknown number plate"}) was detected ${location} at ${time}.`,
        color: "text-blue-300",
      };
    }
    return {
      text: `🔍 A new object (${entry.class}) was detected ${location} at ${time}.`,
      color: "text-gray-300",
    };
  };

  return (
    <div className="hidden md:flex flex-col h-full p-4 bg-none text-white overflow-y-auto rounded-md ">
        
        <ScrollArea className="h-96 w-full rounded-md border">
            <div className="p-2">            
                {loading ? (
                    <p className="text-center text-gray-400">Loading live captions...</p>
                ) : Object.keys(groupedPersonals).length === 0 ? (
                    <p className="text-center text-gray-400">No recent activity.</p>
                ) : (
                    Object.entries(groupedPersonals).map(([_, entries]) =>
                    entries.map((entry, index) => {
                        const { text, color } = formatCaption(entry);
                        return (
                        <div key={index} className={`mb-2 p-3 bg-gray-800 rounded-md text-sm shadow-sm ${color}`}>
                            {text}
                        </div>
                        );
                    })
                    )
                )}
            </div>
        </ScrollArea>
      
    </div>
  );
};

export default LiveCaptions;
