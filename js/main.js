const jsonFilePath = "data.json";

const timeFrames = document.querySelectorAll(".timeframes li");
const contentCards = document.querySelector(".content");
console.log(contentCards);

async function fetchData() {
  try {
    const respone = await fetch(jsonFilePath);
    if (!respone.ok) throw new Error("faild to load json file");
    return await respone.json();
  } catch (error) {
    console.error(error);
  }
}

// fetchData();

function updateCards(data, timeframe) {
  contentCards.innerHTML = "";
  data.forEach((activity) => {
    const { title, timeframes } = activity;
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;
    const cardHtml = `
        <div class="card ${title.toLowerCase()}">
        <div class="card-head">
            <h3>${title}</h3>
            <img src="images/icon-ellipsis.svg" alt="ellipsis" />
          </div>
          <div class="card-body">
            <h1>${current} hrs</h1>
            <p>Last Week - ${previous} hrs</p>
          </div>
        </div>
        
        `;
    contentCards.insertAdjacentHTML("beforeend", cardHtml);
  });
}

function setupTimeframeSwitch(data) {
  timeFrames.forEach((timeframe) => {
    timeframe.addEventListener("click", () => {
      timeFrames.forEach((tf) => tf.classList.remove("active"));
      timeframe.classList.add("active");
      updateCards(data, timeframe.dataset.timeframe);
    });
  });

  timeFrames[1].click();
}

async function initDashboard() {
  const data = await fetchData();
  if (data) {
    setupTimeframeSwitch(data);
  }
}

initDashboard();
