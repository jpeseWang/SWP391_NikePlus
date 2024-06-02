"use client";
import Paragraph from "./Paragraph";
import Word from "./Word";
import Character from "./Character";

const paragraph =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";

export default function TextOpacityScrollSection() {
  const words = paragraph.split(" ");
  return (
    <main className="text-gray-700">
      {/* <div style={{ height: "100vh" }}></div>
            <Paragraph paragraph={paragraph} /> */}
      <div style={{ height: "100vh" }}></div>
      <Word paragraph={paragraph} />
      <div style={{ height: "100vh" }}></div>
      <Character paragraph={paragraph} />
      <div style={{ height: "100vh" }}></div>
    </main>
  );
}
