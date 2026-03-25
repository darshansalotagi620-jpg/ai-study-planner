let tasks = [];

function addTask() {
  const subject = document.getElementById("subject").value;
  const topic = document.getElementById("topic").value;
  const hours = document.getElementById("hours").value;
  const deadline = document.getElementById("deadline").value;

  if (!subject || !topic || !hours || !deadline) {
    alert("Please fill all fields!");
    return;
  }

  const task = { subject, topic, hours, deadline };
  tasks.push(task);

  displayTasks();

  document.getElementById("subject").value = "";
  document.getElementById("topic").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("deadline").value = "";
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.subject}</strong> - ${task.topic} <br>
      ⏳ ${task.hours} hrs | 📅 ${task.deadline}
    `;
    taskList.appendChild(li);
  });
}

async function generatePlan() {
  const planOutput = document.getElementById("planOutput");

  if (tasks.length === 0) {
    alert("Please add at least one task!");
    return;
  }

  planOutput.innerHTML = "⏳ Generating AI study plan... Please wait.";

  try {
    const response = await fetch("http://localhost:5000/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tasks })
    });

    const data = await response.json();

    if (data.plan) {
      planOutput.innerHTML = data.plan;
    } else {
      planOutput.innerHTML = "❌ Failed to generate plan.";
    }
  } catch (error) {
    console.error(error);
    planOutput.innerHTML = "❌ Error connecting to AI backend.";
  }
}