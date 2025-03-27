import type { NextApiRequest, NextApiResponse } from "next";
import { useTopicContext } from "@/contexts/TopicContext";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { topicName, groupedPersonals } = await req.body;

    // Access and update the TopicContext
    const { updateTopic } = useTopicContext();
    console.log(`Updating topic: ${topicName}, personals: ${JSON.stringify(groupedPersonals)}`);
    updateTopic(topicName, groupedPersonals);

    return res.status(200).json({ success: true });
    } catch (error) {
    console.error("Error updating topic:", error);
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
}
