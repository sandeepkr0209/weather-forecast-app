import { useEffect, useState } from "react";

const Clock = () => {

    const [currentTime, setCurrentTime] = useState(new Date())
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-3xl font-medium">{currentTime.toLocaleTimeString()} </h1>
      <p className="text-sm md:text-md font-small">{currentTime.toLocaleDateString()} </p>
    </div>
  );
}

export default Clock