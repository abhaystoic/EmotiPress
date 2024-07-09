import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Auth = () => {
 
  const [user, setUser] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
  );
};

export default Auth;
