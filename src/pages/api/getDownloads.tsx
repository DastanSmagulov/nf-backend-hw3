import axios from "axios";
import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const getDownloads = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { inputText } = req.body;

    const response = await axios.get(
      `https://www.npmjs.com/package/${inputText.toLowerCase()}`
    );
    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const downloads =
      document.querySelector("._9ba9a726")?.textContent || "No downloads found";

    console.log("Downloads:", downloads);
    res.status(200).json({ downloads });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default getDownloads;
