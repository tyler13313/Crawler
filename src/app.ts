import {initialize} from "koalanlp/Util";
import { CrawlerCoordinator } from "./libs/crawlerCoordinator";

(async () =>{
  await initialize({
    packages: {KMR:"2.0.4",KKMA:"2.0.4"},
    verbose: true,
  });
  const coordinator = new CrawlerCoordinator();
  coordinator.reportUrl("https://news.naver.com");
  await coordinator.start();
})

