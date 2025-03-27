'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Camera {
  _id: string;
  Auth: {
    username: string;
    password: string;
  };
  CameraName: string;
  Floor: string;
  IP: string;
  Location: string;
  Url: string;
  topic: string;
  EntryExit: string;
}

interface CameraContextProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  setSelectedCamera: (camera: Camera | null) => void;
}

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  console.log('Cameras:', cameras);

  // Fetch cameras when the provider mounts
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch('/api/cameras/get_all');
        const data = await response.json();
        setCameras(data.cameras || []);
        if (data.cameras && data.cameras.length > 0) {
          setSelectedCamera(data.cameras[0]);
        }
      } catch (error) {
        console.error('Failed to fetch cameras:', error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <CameraContext.Provider value={{ cameras, selectedCamera, setSelectedCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};
