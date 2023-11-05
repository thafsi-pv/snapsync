export const containsOnlyEmojis = (text) => {
  // Define a regular expression pattern to match emojis
  const emojiPattern =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1F910}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F251}\u{200D}\u{FE0F}]/gu;

  // Remove emojis from the text and check if anything remains
  const textWithoutEmojis = text.replace(emojiPattern, "").trim();

  // If the text without emojis is empty, it means it contains only emojis
  return textWithoutEmojis === "";
};
