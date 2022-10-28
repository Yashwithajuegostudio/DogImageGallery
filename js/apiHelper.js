function getApiCall(getUrl, getData) {
  fetch(getUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => getData(data))
    .catch((error) => console.error(error));
}
export { getApiCall };
