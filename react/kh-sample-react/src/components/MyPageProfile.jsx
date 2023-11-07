import React, { useState } from "react";
import { storage } from "../api/firebase";
import {
  ImageSubmit,
  IsideImage,
  ImageSection,
  ImageUpload,
} from "./MyPageComp";

const ProfileImage = () => {
  const [msg, setMsg] = useState("");

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("File uploaded successfully!");
      fileRef.getDownloadURL().then((url) => {
        console.log("저장경로 확인 : " + url);
        setUrl(url);
        setMsg(url);
      });
    });
  };

  return (
    <>
      <ImageSection>
        {url && <IsideImage src={url} alt="uploaded" />}
      </ImageSection>
      <ImageSection height="15%">
        <ImageSubmit
          width="45%"
          height="100%"
          type="file"
          onChange={handleFileInputChange}
        />
        <ImageUpload width="45%" height="100%" onClick={handleUploadClick}>
          사진 등록
        </ImageUpload>
      </ImageSection>
    </>
  );
};

export default ProfileImage;
