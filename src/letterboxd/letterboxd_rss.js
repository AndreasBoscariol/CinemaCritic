async function readRSS(username) {
  const url = `https://letterboxd.com/${username}/rss/`;
  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    return Array.from(items).map(item => {
      const fullTitle = item.querySelector("title") ? item.querySelector("title").textContent : "No title";
      const title = fullTitle.split(',')[0]; 
      const rating = item.querySelector("*|memberRating") ? item.querySelector("*|memberRating").textContent : "No rating";
      const watchedDate = item.querySelector("*|watchedDate") ? item.querySelector("*|watchedDate").textContent : "No date";
      
      const description = item.querySelector("description") ? item.querySelector("description").textContent : "No review";
      const htmlContent = parser.parseFromString(description, "text/html");
      const reviewParagraphs = htmlContent.querySelectorAll("p");

      const meaningfulReview = Array.from(reviewParagraphs).reduce((acc, p) => {
        const text = p.textContent.trim();
        if (text && !text.startsWith("Watched on") && text !== "No review") { 
          acc.push(text);
        }
        return acc;
      }, []);

      const reviewText = meaningfulReview.length > 0 ? meaningfulReview.join("\n") : "No review";
      const imgSrc = htmlContent.querySelector("img") ? htmlContent.querySelector("img").src : "No image";

      return { title, rating, review: reviewText, imgSrc, watchedDate };
    });
  } catch (error) {
    console.error('Failed to fetch RSS data:', error);
    return [];
  }
}

export default readRSS;
