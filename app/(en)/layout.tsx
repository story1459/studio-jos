import RootShell, { metadataFor, sharedViewport } from "@/components/RootShell";

export const metadata = metadataFor("en");
export const viewport = sharedViewport;

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
