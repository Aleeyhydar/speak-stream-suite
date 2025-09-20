interface SoundWaveProps {
  className?: string;
  bars?: number;
}

const SoundWave = ({ className = "", bars = 5 }: SoundWaveProps) => {
  return (
    <div className={`flex items-end justify-center space-x-1 ${className}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <div
          key={index}
          className="sound-wave"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export default SoundWave;