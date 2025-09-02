export function htmlToPlainText(html: string): string {
  // Create a temporary DOM element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;

  // Get text content (this strips tags & decodes HTML entities)
  return tempElement.textContent || tempElement.innerText || "";
}
