import { ogImage, ogMeta } from "@/components/OgImage";

export const alt = ogMeta("en").alt;
export const size = ogMeta("en").size;
export const contentType = ogMeta("en").contentType;

export default function OpengraphImage() {
  return ogImage("en");
}
