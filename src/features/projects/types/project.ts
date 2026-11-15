export type Project = {
  slug: string;
  number: string;
  category: string;
  type: string;
  name: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  highlights: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  externalUrl: string;
  externalLabel: string;
  externalType: "live" | "github";
};