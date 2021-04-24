const tabs = document.querySelectorAll(".tab");
const tabsBody = document.querySelectorAll("[role='tabpanel']");

tabs.forEach((tab) => {
  // Removes all every time
  tab.addEventListener("click", () => {
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
