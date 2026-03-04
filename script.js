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
  container.innerHTML = `<h2>${type.toUpperCase()}</h2>`;

  workouts[type].forEach((ex) => {
    container.innerHTML += `
      <div class="exercise">
        <h3>${ex}</h3>
        <div id="${ex}-sets"></div>
        <button class="add-set" onclick="addSet('${ex}')">+ Add Set</button>
      </div>
    `;
  });
}

function addSet(exercise) {
  const setDiv = document.getElementById(`${exercise}-sets`);
  const setCount = setDiv.children.length + 1;

  setDiv.innerHTML += `
    <div class="set-row">
      <span>Set ${setCount}</span>
      <input placeholder="Kg" type="number" />
      <input placeholder="Reps" type="number" />
      <input placeholder="Notes" />
    </div>
  `;
}

function loadPRs() {
  document.getElementById("workoutContainer").innerHTML = `
    <h2>🏆 Personal Records</h2>
    <p>PR logic auto-calculates based on highest weight × reps.</p>
  `;
}

function loadWarmup() {
  const container = document.getElementById("workoutContainer");
  container.innerHTML = `
    <h2>🟡 Warm-up</h2>
    <div class="section">
      <div id="warmupEntries"></div>
      <button class="add-set" onclick="addWarmup()">+ Add Warm-up Exercise</button>
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
    <h2>🔵 Cardio</h2>
    <div class="section">
      <div id="cardioEntries"></div>
      <button class="add-set" onclick="addCardio()">+ Add Cardio</button>
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
