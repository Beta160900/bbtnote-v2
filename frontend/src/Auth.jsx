const apiUrl = import.meta.env.VITE_API_URL;

export function Auth() {
  return (
    <>
      <div className="h-screen">
        test Auth
        <p>{apiUrl}</p>
      </div>
    </>
  );
}
