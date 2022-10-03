import axios from "axios";

export const useBase64ImageUp = () => {
  const base64ImageUp = async (base64: string) => {
    try {
      const res = await axios.post(
        "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/upload_image/",
        { base64: base64 }
      );
      const tempIconData:string = res.data.url;
      return tempIconData;
    } catch {
      console.log("error");
    }
  };
  return { base64ImageUp };
};
