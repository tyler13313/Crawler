import { Crawler } from "./libs/crawler";
import { CrawlerCoordinator } from "./libs/crawlerCoordinator";

const text = `<body>
<a href="https://naver.com">hello</a>
<div>sdfdsfsf</div>
<a href="https://kakao.com">world</a>
</body>`;

const matched = text.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1>/i);
console.log(matched);
const multipleMatched = text.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1>/g);
console.log(multipleMatched);

(async () => {
  const coordinator = new CrawlerCoordinator();
  coordinator.reportUrl("https://naver.com");
  await coordinator.start();
})();
