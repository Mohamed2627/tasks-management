import { useState } from 'react'
import { cn } from '../../utils/cn'


interface IDropAreaProps {
  onDrop: () => void
}
const DropArea = ({ onDrop }: IDropAreaProps) => {

  const [showDropArea, setShowDropArea] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setShowDropArea(false);
    onDrop();
  };

  return (
    <div
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={
        cn('absolute inset-0 bg-gray-400 border min-h-20 transition-none border-color flex justify-center items-center',
          showDropArea ? "opacity-90 z-10" : "opacity-0 z-0"
        )
      } >
      {showDropArea && (
        <p>Drop Here</p>
      )}
    </div >
  )
}

export default DropArea