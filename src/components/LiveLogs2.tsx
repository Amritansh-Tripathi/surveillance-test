import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmployeeCard from "@/components/EmployeeCard";
import ObjectCard from "@/components/ObjectCard";
import { useTopicContext } from "@/contexts/TopicContext";
// import "../../styles/customScrollbar.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface LiveLogs2Props {
  CameraName: string;
  topicName: string | null;
}

const LiveLogs2: React.FC<LiveLogs2Props> = ({ CameraName, topicName }) => {
  const { groupedPersonals, subscribeToTopic } = useTopicContext();
  const [loading, setLoading] = useState(true);

  // Reset logs and subscribe to the new topic when topicName changes
  useEffect(() => {
    if (!topicName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const logsTopic = `${topicName}/logs`; // Subscribe to topic/logs
    subscribeToTopic(logsTopic);

    setLoading(false); // Set loading to false once subscribed
  }, [topicName, subscribeToTopic]);

  const handleStatusChange = async (Person_id: string, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/personals`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Person_id, Status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className='grid h-full'>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative flex flex-row align-middle justify-center gap-[5px] rounded-[15px] border overflow-hidden pr-[5px] w-full h-32 animate-pulse bg-[#1B1B2E]"
            />
          ))}
        </div>
      ) : Object.keys(groupedPersonals).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full text-white/60">
          <p className="text-lg">No activity detected</p>
          <p className="text-sm">Waiting for events from {CameraName}</p>
        </div>
      ) : (
        <ScrollArea className="h-96 w-full rounded-md border ">
          {Object.entries(groupedPersonals).map(([department, entries], index) => (
            <div key={index} className="grid gap-y-2 gap-x-2 p-2 h-fit items-center"
            style={{
              gridTemplateColumns: `repeat(2, minmax(100px, 1fr))`,
              gridTemplateRows: `repeat(3, minmax(100px, 140px))`,
            }}>
              {/* <div
            key={index}
            className="grid gap-2 p-2 items-center 
              sm:grid-cols-1 sm:grid-rows-1 
              lg:grid-cols-3 lg:grid-rows-3"
            
          > */}
            {entries.map((person, personIndex) => {
              if (person.Type === "Personal") {
                return (
                  <EmployeeCard
                    key={personIndex}
                    id={person.id}
                    Person_id={person.INFO?.Person_id}
                    type={person.class}
                    name={person.INFO?.Name || "Unknown"}
                    Snapshot={person.Snapshot}
                    designation={person.INFO?.Role}
                    timeStamp={Number(person?.TimeStamp) || 1733345323}
                    purpose={person.INFO?.purpose || "N/A"}
                    department={person.INFO?.Department}
                    carNumber={person.INFO?.Vehicle}
                    remark={person.INFO?.Status}
                    borderColor="#1D36B9"
                    image={person.INFO?.ProfilePic}
                    Age={person.INFO?.Age}
                    onStatusChange={handleStatusChange}
                  />
                );
              } else if (person.Type === "Visitor") {
                return (
                  <EmployeeCard
                    key={personIndex}
                    id={person.id}
                    Person_id={person.Person_id}
                    type={person.class}
                    name={person.INFO?.Name || "Visitor"}
                    Snapshot={person.Snapshot}
                    designation={person.INFO?.Role}
                    timeStamp={Number(person?.TimeStamp) || 0}
                    purpose={person.INFO?.purpose || "N/A"}
                    department={person.INFO?.Department}
                    carNumber={person.INFO?.Vehicle}
                    remark={false}
                    borderColor="#FFB903"
                    image={person.INFO?.ProfilePic}
                    Age={person.INFO?.Age}
                    onStatusChange={handleStatusChange}
                  />
                );
              } else if (person.Type === "Unknown") {
                return (
                  <EmployeeCard
                    key={personIndex}
                    id={person.id}
                    Person_id={person.INFO?.Person_id}
                    type={person.class}
                    name={person.INFO?.Name || "Unknown"}
                    Snapshot={person.Snapshot}
                    designation={person.INFO?.Role || "Unknown"}
                    timeStamp={Number(person?.TimeStamp) || 1733345323}
                    purpose="N/A"
                    department="Unknown"
                    carNumber="N/A"
                    remark={false}
                    borderColor="#FF0000"
                    image=""
                    Age="Unknown"
                    onStatusChange={handleStatusChange}
                  />
                );
              } else if (person.class !== "person") {
                return (
                  <ObjectCard
                    key={personIndex}
                    id={person.id}
                    type={person.class}
                    name={person.INFO?.Name || "Unknown"}
                    Snapshot={person.Snapshot}
                    timeStamp={Number(person?.TimeStamp) || 1733345323}
                    borderColor="#1D36B9"
                  />
                );
              }
            })}
          </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default LiveLogs2;
