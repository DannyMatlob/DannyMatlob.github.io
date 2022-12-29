let activeIndex = 0;
const projectClass = ["about", "proj1", "proj2", "proj3", "proj4", "proj5", "proj6"];

descriptions = document.getElementsByClassName("project");
links = document.querySelectorAll("#project-buttons a");
console.log(links);

for (let i = 1; i <= descriptions.length; i++) {
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

    console.log(projectClass[index]);

    document.getElementById("projectBox").className = projectClass[index];
    links.forEach(element => {
        element.className = projectClass[index];
    });

    activeIndex = index;
}
