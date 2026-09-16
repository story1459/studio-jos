import { ogImage, ogMeta } from "@/components/OgImage";

export const alt = ogMeta("ko").alt;
export const size = ogMeta("ko").size;
export const contentType = ogMeta("ko").contentType;

export default function OpengraphImage() {
  return ogImage("ko");
}
