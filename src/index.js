const floors = document.getElementById("floors");
const lift = document.getElementById("lift");
const create = document.querySelector(".Generate");
const section_output = document.querySelector(".section-output");
const alertsections = document.querySelector(".alert-sections");

create.addEventListener("click", function () {
  if (lift.value > 4) {
    alertsections.classList.add("alert-section");
    setTimeout(() => {
      alertsections.classList.remove("alert-section");
    }, 3000);
  } else {
    copyboxx(floors.value, lift.value);
  }
});

// adding Floor
function copyboxx(e, liftNo) {
  section_output.innerHTML = "";
  for (let i = e; i > 0; i--) {
    section_output.innerHTML =
      section_output.innerHTML +
      `
    <div class="box">
    <div class="up-down">
      <div class="ups-down ${i}" id="up-only" data-floor = ${i}>Up</div>
      <div class="ups-down ${i}" id="Down-only" data-floor = ${i}>Down</div>
    </div>
    <div class="fursh">
    <div class="Lift-frush">
    ${i == 1 ? copylift(liftNo) : ``}
    </div>
      <div id="fursh-ground"></div>
    </div>
    <div class="floor_number">Floor ${i}</div>
  </div>
    `;
  }
}

// adding  Lift
function copylift(e) {
  let containerLift = document.createElement("div");
  containerLift.classList.add("lifts");

  let Lifts = "";
  for (let j = 0; j < e; j++) {
    Lifts += `<div class="lift" data-currentlocation = "0">
    <div id="lift-left" class="lift-door"></div>
    <div id="lift-right" class="lift-door"></div>
  </div>`;
  }

  containerLift.innerHTML = Lifts;
  return containerLift.innerHTML;
}

let x = 0;
// add Event on Up and down
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("ups-down")) {
    if (e.target.dataset.floor == x) {
      return;
    } else {
      LiftStatus(e.target.classList.item(1));
    }
    x = e.target.dataset.floor;
  }
});

function LiftStatus(ClickedFloor) {
  const liftt = Array.from(document.getElementsByClassName("lift"));

  let i;
  for (i = 0; i < liftt.length; i++) {
    if (!liftt[i].classList.contains("busy")) {
      MovingTheLift(ClickedFloor, liftt[i]);

      return;
    }
  }
}

// So, let's move the lift
function MovingTheLift(ClickedFloor, LiftMove) {
  let currentlocations = LiftMove.dataset.currentlocation;
  let timming = Math.abs(ClickedFloor - currentlocations) * 2;
  let move = (ClickedFloor - 1) * -232;
  LiftMove.style.transition = `transform ${timming}s linear`;
  LiftMove.style.transform = "translateY(" + move + "px)";
  LiftMove.classList.add("busy");
  LiftMove.dataset.currentlocation = ClickedFloor;

  // open the Doors
  setTimeout(() => {
    LiftMove.children[0].classList.add("lift-left-open");
    LiftMove.children[1].classList.add("lift-right-open");
  }, timming * 1000 + 1000);

  setTimeout(() => {
    LiftMove.children[0].classList.remove("lift-left-open");
    LiftMove.children[1].classList.remove("lift-right-open");
  }, timming * 1000 + 4000);

  setTimeout(() => {
    LiftMove.classList.remove("busy");
  }, timming * 1000 + 7000);
}
