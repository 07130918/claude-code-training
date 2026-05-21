import type { Metadata } from "next";
import MarkdownEditor from "@/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Markdown エディター",
  description: "Markdown をリアルタイムでプレビューできるエディターです。",
};

export default function EditorPage() {
  return <MarkdownEditor />;
}
