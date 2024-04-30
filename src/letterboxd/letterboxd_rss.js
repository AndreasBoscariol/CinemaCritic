
async function readRSS(username) {
  const url = `https://letterboxd.com/${username}/rss/`;
  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const items = xmlDoc.querySelectorAll("item");
    return Array.from(items).map(item => {
      const title = item.querySelector("title") ? item.querySelector("title").textContent : "No title";
      const rating = item.querySelector("letterboxd\\:memberRating") ? item.querySelector("letterboxd\\:memberRating").textContent : "No rating";
      const review = item.querySelector("description") ? item.querySelector("description").textContent : "No review";
      return { title, rating, review };
    });
  } catch (error) {
    console.error('Failed to fetch RSS data:', error);
    return [];
  }
}

export default readRSS;
