import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function Auth() {
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    fetch(apiUrl + "/token?code=" + authorizationCode + "&state=" + state, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) window.location.href = "/";
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <div>Authenticating...</div>
      <p>{authorizationCode}</p>
      <p>{state}</p>
    </>
  );
}
