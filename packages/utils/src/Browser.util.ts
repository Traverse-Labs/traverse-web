import { MutableRefObject } from "react";

export const focusInput = (
  ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement>
) => {
  const fakeInput = document.createElement("input");

  fakeInput.setAttribute("type", "text");
  fakeInput.style.position = "absolute";
  fakeInput.style.opacity = "0";
  fakeInput.style.height = "0";
  fakeInput.style.fontSize = "16px"; // disable auto zoom
  document.body.prepend(fakeInput);

  fakeInput.focus();

  setTimeout(() => {
    ref.current?.focus();
    fakeInput.remove();
  }, 1000);
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
