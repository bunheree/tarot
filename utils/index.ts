export function formatTextToHTML(input: string): string {
  // Replace **text** with <strong>text</strong>
  let formatted = input.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *text* with <em>text</em>
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Replace line breaks with <br> tags
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted;
}
