export interface IRoot {
  exponatname: string;
  barrels: IBarrel[];
}

export interface IBarrel {
  year: string;
  image: string;
  description: string;
  quote: string;
  quote_explanation: string;
  news: string;
  news_images: string[];
  circle_1_top: string;
  circle_1_left: string;
  circle_2_top: string;
  circle_2_left: string;
  circle_3_top: string;
  circle_3_left: string;
}
