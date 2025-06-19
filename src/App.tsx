import { useEffect, useState } from "react";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [sample1, setSample1] = useState<string>("");
  const [sample2, setSample2] = useState<string>("");
  const [sample3, setSample3] = useState<string>("");
  const [sample4, setSample4] = useState<string>("");
  const [sample5, setSample5] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSample4("여기는 이미지 체인지가 발생하는 부분이야" + file?.name || "");
    if (file) {
      setImage(file);
      setSample4("여기는 이미지를 파일 형태로 보여준다" + file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setSample5(
          "여기는 이미지를 문자열로 보여준다(파일리더)" + reader.result
        );
      };
      reader.readAsDataURL(file);
    }
  };
  const handleMessage = (event: MessageEvent) => {
    setSample1(`handleMessage 이벤트가 실행되었습니다${event.data}`);
    try {
      const data = JSON.parse(event.data);
      setSample2(`handleMessage 이벤트에서 파싱되었습니다.${data}`);
      if (data.type === "cameraImage" && data.uri) {
        setSample3(
          `handleDrugPhotoSearch 이벤트가 실행되었습니다.${data.uri} 은 uri 입니다.`
        );
      }
    } catch (error) {
      console.error("Error parsing message data:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        height: "100vh",
      }}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      />
      {image && <p>{image.name}</p>}
      <div
        style={{ width: "300px", height: "300px", backgroundColor: "red" }}
        className="camera-preview"
      >
        {profileImage && <img src={profileImage} alt="Preview" />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          border: "1px solid black",
          width: "300px",
        }}
      >
        <p>오류들</p>
        <p>{sample1}</p>
        <p>{sample2}</p>
        <p>{sample3}</p>
        <p>{sample4}</p>
        <p>{sample5}</p>
      </div>
    </div>
  );
}

export default App;
