export const movieAPI = (data) =>
  `https://yts-proxy.now.sh/list_movies.json?limit=10&&sort_by=download_count&page=${data}`;

export const movieAPI2 = (data) => `https://yts-proxy.now.sh/list_movies.json?limit=10&page=${data + 1}`;
