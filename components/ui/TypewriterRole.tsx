"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Web Developer & IT Helper",
  "Full Stack Laravel & PHP",
  "React & Next.js Engineer",
  "Database & System Builder",
];

export default function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      // Switch to next word
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 300);
    } else {
      // Typing or deleting speed
      const speed = isDeleting ? 35 : 70;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <span className="inline-block">
      <span className="text-gradient-blue font-bold">{currentText}</span>
      <span className="inline-block w-0.5 h-6 ml-1 bg-blue-600 animate-pulse align-middle" />
    </span>
  );
}
