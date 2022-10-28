async function getApiCall(getUrl, getData) {
  await fetch(getUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with the status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => getData(data))
    .catch((error) => console.error(error));
}
export { getApiCall };
