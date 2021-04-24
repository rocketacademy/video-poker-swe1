const tabs = document.querySelectorAll(".tab");
const tabsBody = document.querySelectorAll("[role='tabpanel']");

tabs.forEach((tab) => {
  // Removes all every time
  tab.addEventListener("click", () => {
    // Reset function (refactor)
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", false);
    });

    tabsBody.forEach((tabBody) => {
      tabBody.setAttribute("hidden", true);
    });

    // Selects which tab & body
    const tabName = tab.getAttribute("aria-controls");
    const tabBody = document.getElementById(`${tabName}`);

    tab.setAttribute("aria-selected", true);
    tabBody.removeAttribute("hidden");
  });
});

const cardBacks = document.querySelectorAll(".card-back");
let selectedBack = cardBacks[0];

cardBacks.forEach((back) => {
  back.addEventListener("click", () => {
    // Remove active state from all other backs
    cardBacks.forEach((back) => {
      selectedBack = "";
      back.classList.remove("card-active");
    });

    // Adds active state to the back after it's been clicked
    selectedBack = back;
    const selectedBackTag = document.getElementById("card-div card-active");
    selectedBack.classList.add("card-active");
    console.log(`selected back`, selectedBack.className);
  });
});
