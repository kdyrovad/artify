import axios from "axios";

const clientId = process.env.REACT_APP_ARTSY_CLIENT_ID!;
const clientSecret = process.env.REACT_APP_ARTSY_CLIENT_SECRET!;

let token: string | null = null; 

export async function getToken() {
  const cachedToken = sessionStorage.getItem("artsyToken");
  const expiry = sessionStorage.getItem("artsyTokenExpiry");

  if (cachedToken && expiry && Date.now() < parseInt(expiry)) {
    return cachedToken;
  }

  const response = await axios.post("https://api.artsy.net/api/tokens/xapp_token", {
    client_id: clientId,
    client_secret: clientSecret
  });

  const token = response.data.token;
  const expiresAt = new Date(response.data.expires_at).getTime();

  sessionStorage.setItem("artsyToken", token);
  sessionStorage.setItem("artsyTokenExpiry", expiresAt.toString());

  return token;
}

export async function fetchArtworks() {
  const token = await getToken();
  const response = await axios.get("https://api.artsy.net/api/artworks?size=12", {
    headers: { "X-Xapp-Token": token }
  });
  return response.data._embedded.artworks;
}