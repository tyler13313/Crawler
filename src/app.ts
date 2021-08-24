import { parse } from "node-html-parser";
import { CrawlerCoordinator } from "./libs/crawlerCoordinator";

const text = `<body>
<a href = "https://naver.com">hello</a>
<div>sdfdsfsf</div>
<a href = "https://kakao.com">world</a>
</body>`;

const html = parse(text);
console.log(html.querySelector("a"));

(async () => {
  const coordinator = new CrawlerCoordinator();
  coordinator.reportUrl("https://news.naver.com");
  await coordinator.start();
})();
