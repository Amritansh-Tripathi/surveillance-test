import React from "react";
import toast from "react-hot-toast";

interface SaveUsersButtonProps {
  excelData: Array<Record<string, any>> | null;
  images: Array<{ id: string; base64: string;}> | null;
}

const SaveUsersButton: React.FC<SaveUsersButtonProps> = ({ excelData, images }) => {
  const handleSaveUsers = async () => {
    if (excelData && images) {
      // Map images to their respective users by ID
      const imageMap = new Map(images.map((img) => [img.id, img.base64]));

      // Transform and validate data
      const transformedData = excelData.map((row, index) => ({
        name: row.name || null,
        email: row.email || null,
        phone: row.phone || null,
        department: row.department || null,
        age: typeof row.age === "number" ? row.age : null,
        role: row.role || null,
        status: typeof row.status === "boolean" ? row.status : true,
        profilePic: imageMap.get(`image-${index}`) || null, // Match image by ID (e.g., "image-0")
      }));

      // Filter out invalid rows
      const validData = transformedData.filter(
        (user) => user.email && user.phone
      );

      if (validData.length === 0) {
        toast.error("No valid users to save!");
        return;
      }

      try {
        const response = await fetch("/api/save-users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users: validData }),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success(`Successfully saved ${result.savedCount} users!`);
        } else {
          toast.error("Failed to save users. Please check the logs.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while saving users.");
      }
    } else {
      toast.error("No data or images to save!");
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4"
      onClick={handleSaveUsers}
    >
      Save Users to Database
    </button>
  );
};

export default SaveUsersButton;
