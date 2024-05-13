import fetch from 'node-fetch';
import { DOMParser } from 'xmldom';
import express from 'express';
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/default/letterboxdrss-dev', async (req, res) => {
  const { username } = req.body;
  const url = `https://letterboxd.com/${username}/rss/`;

  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const items = xmlDoc.getElementsByTagName("item");

    const result = Array.from(items).filter(item => {
      const link = item.getElementsByTagName("link")[0] ? item.getElementsByTagName("link")[0].textContent : "";
      return !link.includes("/list/");
    }).map(item => {
      const fullTitle = item.getElementsByTagName("title")[0] ? item.getElementsByTagName("title")[0].textContent : "No title";
      const title = fullTitle.split(',')[0];
      const rating = item.getElementsByTagName("memberRating")[0] ? item.getElementsByTagName("memberRating")[0].textContent : "No rating";
      const watchedDate = item.getElementsByTagName("watchedDate")[0] ? item.getElementsByTagName("watchedDate")[0].textContent : "No date";

      const description = item.getElementsByTagName("description")[0] ? item.getElementsByTagName("description")[0].textContent : "No review";
      const htmlContent = parser.parseFromString(description, "text/html");
      const reviewParagraphs = htmlContent.getElementsByTagName("p");

      const meaningfulReview = Array.from(reviewParagraphs).reduce((acc, p) => {
        const text = p.textContent.trim();
        if (text && !text.startsWith("Watched on") && text !== "No review") { 
          acc.push(text);
        }
        return acc;
      }, []);

      const reviewText = meaningfulReview.length > 0 ? meaningfulReview.join("\n") : "No review";
      const imgSrc = htmlContent.getElementsByTagName("img")[0] ? htmlContent.getElementsByTagName("img")[0].src : "No image";

      return { title, rating, review: reviewText, imgSrc, watchedDate };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to fetch RSS data:', error);
    res.status(500).json({ message: "Failed to fetch RSS data" });
  }
});
