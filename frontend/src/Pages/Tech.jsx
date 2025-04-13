import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Box from "../Components/SubjectBox";

export function Tech() {
  const headfolder = "Tech";
  const [subfolders, setSubfolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/auth/check", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          alert("Please login before entering the page.");
          navigate("/"); // replace with your login route
        }
      })
      .catch(() => {
        alert("Please login before entering the page.");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    fetch(`http://localhost:3000/folder?foldername=${headfolder}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.subfolders) {
          const cleaned = data.subfolders.map((fullPath) => {
            const folderName = fullPath
              .replace(`${headfolder}/`, "")
              .replace("/", "");
            return {
              subject: folderName,
              folder: `${headfolder}/${folderName}`,
            };
          });
          setSubfolders(cleaned);
        }
      })
      .catch((err) => {
        console.error("Error fetching subfolders:", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col pt-40 pb-40 items-center justify-center">
        {subfolders.map((item, index) => (
          <Box
            key={index}
            subject={item.subject}
            folder={item.folder}
            type={"2"}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
