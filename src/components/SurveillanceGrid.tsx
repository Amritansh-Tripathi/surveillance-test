import { useCameraContext } from '@/contexts/CameraContext';

const SurveillanceGrid = ({ gridView }: { gridView: number }) => {
  const { cameras, selectedCamera, setSelectedCamera } = useCameraContext();

  const getDisplayedCameras = () => {
    if (gridView === 1) {
      return [selectedCamera ?? cameras[0]].filter(Boolean);
    }
    return cameras.slice(0, gridView * gridView);
  };

  const displayedCameras = getDisplayedCameras();

  return (
    <div
      className="grid bg-[#1B1B2E] rounded-lg w-full h-full p-2 m-1"
      style={{
        gridTemplateColumns: `repeat(${gridView}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridView}, minmax(0, 1fr))`,
        gap: '0.5rem',
      }}
    >
      {displayedCameras.map((camera) => (
        <div
          key={camera._id}
          onClick={() => setSelectedCamera(camera)}
          className={`bg-[#121125] rounded-md p-2 lg:p-0 flex items-center justify-center text-white ${
            selectedCamera?._id === camera._id ? 'border-2 border-blue-500' : ''
          }`}
        >
          <iframe
            src={`https://192.168.33.200:8889/${camera.topic}`}
            className="w-full h-full rounded-sm"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};

export default SurveillanceGrid;
