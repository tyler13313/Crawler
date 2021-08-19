import { parse } from "node-html-parser";
import axios, { AxiosError } from "axios";
import { CrawlerCoordinator } from "./crawlerCoordinator";

export class Crawler {
  private url: string;
  private content?: string;
  private coordinator: CrawlerCoordinator;
  private host?: string;

  public constructor(url: string, coordinator: CrawlerCoordinator) {
    this.url = url;
    this.coordinator = coordinator;
  }
  private async fetch(): Promise<string | null> {
    try {
      const { data, request } = await axios.get(this.url, { timeout: 3000 });
      this.host = request.host;
      return data;
    } catch (error) {
      if (error.isAxiosError) {
        const e: AxiosError = error;
        console.error(e.response?.status);
      }
    }
    return null;
  }
  public async trip(): Promise<void> {
    const result = await this.fetch();
    if (result) {
      this.content = result;
      //console.log(result);
      await this.parseContent();
    } else {
      console.log("Failed to get url data");
    }
  }
  private async parseContent(): Promise<void> {
    console.log(this.content);
    if (!this.content) {
      return;
    }
    const html = parse(this.content);
    const anchors = html.querySelectorAll("a");

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      const matched = href.match(
        /^(((http|ftp|https):\/\/)|(\/))*[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/i //g=전체를 본다, i=대소문자 구분 안함
      );

      if (!matched) {
        return null;
      }

      let url = matched[0];

      if (url.startsWith("/")) {
        url = this.host + url;
      } else if (!href.startsWith("http")) {
        url = this.host + "/" + url;
      }

      //this.coordinator.reportUrl(url);
    });
    html.text.replace(/\s{2,}/g, " ");
    console.log(html.text);
  }
}
