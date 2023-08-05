import axios from "axios";

export const sendTojuge = async (code, stdin, langid) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: true,
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.XRAPIDKEY,
      "X-RapidAPI-Host": process.env.XRAPIDAPIHOST,
    },
    data: {
      language_id: langid,
      source_code: code,
      stdin
    },
  };
  try {
    const r=await axios.request(options);
    return r.data
  } catch (error) {
    return error;
  }
};
export const getfromjudge = async (token) => {
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    headers: {
      'X-RapidAPI-Key': process.env.XRAPIDKEY,
      'X-RapidAPI-Host': process.env.XRAPIDAPIHOST,
    },
  };
  

  try {
     const response = await axios.request(options);
     return response.data
  } catch (error) {
    return {err:error}
  }
};
