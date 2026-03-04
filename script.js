let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};

const workouts = {
  push: [
    "Flat DB Bench Press",
    "Incline BB Bench Press",
    "Pec Deck Fly",
    "High to Low Cable Fly",
    "Seated BB Shoulder Press",
    "Seated Lateral Raise",
    "Chest Supported Front Raise",
    "Rear Delt",
    "EZ Skull Crushers",
    "Tricep Pushdown",
    "Tricep Extension",
    "Leg Raise",
    "Wood Choppers",
    "Rope Crunch",
  ],
  pull: [
    "Lat Pulldown",
    "Bent Over Row",
    "Single Arm DB Row",
    "Seated Row",
    "BB Shrugs",
    "DB Curl",
    "Hammer Curl",
    "Spider / Concentration Curl",
    "Reverse Curl",
    "Behind Wrist Curl",
    "Wrist Extension",
    "Suitcase Hold",
  ],
  legs: [
    "Squats",
    "Romanian Deadlift",
    "Leg Curl",
    "Leg Extension",
    "Standing Calf Raise",
    "Seated Calf Raise",
  ],
};

function loadWorkout(type) {
  const container = document.getElementById("workoutContainer");
  container.innerHTML = `<h2>🏋️ ${type.toUpperCase()}</h2>`;

  workouts[type].forEach((ex) => {
    container.innerHTML += `
    <div class="exercise">
      <h3>🏋️ ${ex}</h3>
      <div id="${ex}-sets"></div>
      <button class="add-set" onclick="addSet('${ex}')">➕ Add Set</button>
    </div>
  `;

    if (workoutData[ex]) {
      workoutData[ex].forEach((set, i) => {
        const setDiv = document.getElementById(`${ex}-sets`);
        const row = document.createElement("div");
        row.className = "set-row";
        row.innerHTML = `
        <span>Set ${i + 1}</span>
        <input type="number" value="${set.kg}" placeholder="Kg"
          oninput="updateSet('${ex}', ${i}, 'kg', this.value)" />
        <input type="number" value="${set.reps}" placeholder="Reps"
          oninput="updateSet('${ex}', ${i}, 'reps', this.value)" />
        <input value="${set.notes}" placeholder="Notes"
          oninput="updateSet('${ex}', ${i}, 'notes', this.value)" />
      `;
        setDiv.appendChild(row);
      });
    }
  });
}

function addSet(exercise) {
  const setDiv = document.getElementById(`${exercise}-sets`);
  const setIndex = setDiv.children.length;

  if (!workoutData[exercise]) {
    workoutData[exercise] = [];
  }

  workoutData[exercise].push({ kg: "", reps: "", notes: "" });
  saveWorkout();

  const row = document.createElement("div");
  row.className = "set-row";

  row.innerHTML = `
    <span>Set ${setIndex + 1}</span>
    <input type="number" placeholder="Kg"
      oninput="updateSet('${exercise}', ${setIndex}, 'kg', this.value)" />
    <input type="number" placeholder="Reps"
      oninput="updateSet('${exercise}', ${setIndex}, 'reps', this.value)" />
    <input placeholder="Notes"
      oninput="updateSet('${exercise}', ${setIndex}, 'notes', this.value)" />
  `;

  setDiv.appendChild(row);
}

function loadPRs() {
  document.getElementById("workoutContainer").innerHTML = `
  <h2>🏆 Personal Records</h2>
  <p>📈 PR logic auto-calculates based on highest weight × reps.</p>
`;
}

function loadWarmup() {
  const container = document.getElementById("workoutContainer");
  container.innerHTML = `
  <h2>🔥 Warm-up</h2>
  <div class="section">
    <div id="warmupEntries"></div>
    <button class="add-set" onclick="addWarmup()">➕ Add Warm-up Exercise</button>
  </div>
`;
}

function addWarmup() {
  const div = document.getElementById("warmupEntries");
  const count = div.children.length + 1;

  div.innerHTML += `
    <div class="entry-row">
      <span>${count}</span>
      <input placeholder="Exercise" />
      <input placeholder="Reps / Time" />
      <input placeholder="Notes" />
    </div>
  `;
}

function loadCardio() {
  const container = document.getElementById("workoutContainer");
  container.innerHTML = `
  <h2>❤️ Cardio</h2>
  <div class="section">
    <div id="cardioEntries"></div>
    <button class="add-set" onclick="addCardio()">➕ Add Cardio</button>
  </div>
`;
}

function addCardio() {
  const div = document.getElementById("cardioEntries");
  const count = div.children.length + 1;

  div.innerHTML += `
    <div class="entry-row">
      <span>${count}</span>
      <input placeholder="Type (Walk / Stairs / Cycle / Rope)" />
      <input placeholder="Time (min)" type="number" />
      <input placeholder="Speed / Level / Intensity" />
      <input placeholder="Notes" />
    </div>
  `;
}

const messages = [
  "Show up. Even if it’s messy.",
  "You don’t need motivation. You need momentum.",
  "This session counts.",
  "No zero days.",
  "Discipline > mood.",
  "You’re rebuilding. Stay patient.",
];

document.getElementById("motivationText").textContent =
  messages[Math.floor(Math.random() * messages.length)];

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function updateStreak() {
  const lastDate = localStorage.getItem("lastWorkoutDate");
  let streak = Number(localStorage.getItem("streak")) || 0;
  const today = getToday();

  if (lastDate !== today) {
    if (lastDate && new Date(today) - new Date(lastDate) === 86400000) {
      streak++;
    } else {
      streak = 1;
    }
    localStorage.setItem("lastWorkoutDate", today);
    localStorage.setItem("streak", streak);
  }

  document.getElementById("streakCount").textContent = streak;
}

updateStreak();

function completeSession() {
  localStorage.setItem("completedToday", getToday());
  showEndScreen();
}

function showEndScreen() {
  document.getElementById("workoutContainer").innerHTML = `
    <div class="section" style="text-align:center">
      <h2>✅ You trained today</h2>
      <p>That’s enough. Recovery matters.</p>
    </div>
  `;
}

function saveData() {
  localStorage.setItem(
    "workoutHTML",
    document.getElementById("workoutContainer").innerHTML,
  );
}

window.onload = () => {
  const saved = localStorage.getItem("workoutHTML");
  if (saved) {
    document.getElementById("workoutContainer").innerHTML = saved;
  }
  updateStreak();
};

function updateTimeline() {
  let start = localStorage.getItem("startDate");
  if (!start) {
    start = getToday();
    localStorage.setItem("startDate", start);
  }

  const days =
    Math.floor((new Date(getToday()) - new Date(start)) / 86400000) + 1;

  document.getElementById("dayCount").textContent = Math.min(days, 100);
}

updateTimeline();

function updateSet(exercise, index, field, value) {
  workoutData[exercise][index][field] = value;
  saveWorkout();
}

function saveWorkout() {
  localStorage.setItem("workoutData", JSON.stringify(workoutData));
}
