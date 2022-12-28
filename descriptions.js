let activeIndex = 0;

descriptions = document.getElementsByClassName("project");

for (let i = 1; i <= 4; i++) {
    document.getElementById("link" + i).addEventListener("click", function() {
        let index = i;
        console.log("setting", index);
        if (activeIndex!=index) {
            updateMain(index);
        } else {
            updateMain(0);
        }
    });
  }

function updateMain (index) {
    descriptions[index].setAttribute("id", "active");
    descriptions[activeIndex].setAttribute("id", "hidden");
    activeIndex = index;
}