import { Crawler } from "./libs/crawler";

(async () => {
  const crawler = new Crawler("https://naver.com/abccdefg");
  await crawler.trip();
})();
