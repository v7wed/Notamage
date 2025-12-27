const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <span className="loading loading-infinity loading-lg text-primary"></span>
      <p className="font-medieval text-xl text-primary/80 animate-pulse">
        Summoning Notes...
      </p>
    </div>
  );
};

export default Loading;
