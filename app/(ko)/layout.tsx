import RootShell, { metadataFor, sharedViewport } from "@/components/RootShell";

export const metadata = metadataFor("ko");
export const viewport = sharedViewport;

export default function KoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="ko">{children}</RootShell>;
}
