import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.com/api",
  timeout: 8000,
});

// Kept as a small service boundary so the mock UI can be connected to a real API later.
export async function getMarketplace() {
  return {
    data: {
      artworks: 24000,
      auctions: 82,
      creators: 200,
      cancelled: 89,
    },
  };
}
