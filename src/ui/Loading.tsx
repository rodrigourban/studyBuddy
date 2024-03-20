function Loading({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center mt-16 gap-6 text-blue-500 text-xl">
      <div className="loader"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
