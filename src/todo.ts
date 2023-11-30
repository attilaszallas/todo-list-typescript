type Task = {
  title: string,
  completed: boolean,
}

const form = document.getElementById('form')! as HTMLElement;
const input = document.getElementById('input')! as HTMLInputElement;
const list = document.getElementById('list')! as HTMLUListElement;
list.setAttribute("style", "list-style-type:none;");

document.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null)
  {
    console.log("no input");
    return;
  }

  console.log("input: " + input.value);

  const newTask: Task = {
    title: input.value,
    completed: false
  }

  addListItem(newTask)
})

function addListItem(task: Task){
  console.log("add list item: " + task.title);
  const item = document.createElement("li")
  const label = document.createElement("label")
  const div = document.createElement("div")
  div.setAttribute("text-align", "center")

  const completeButton = document.createElement("button")
  completeButton.textContent = "Task Completed"
  completeButton.setAttribute("id", "completeButton")
  completeButton.setAttribute("type", "completeButton")
  
  const removeButton = document.createElement("button") 
  removeButton.textContent = "Remove Task"
  removeButton.setAttribute("id", "removeButton")
  removeButton.setAttribute("type", "removeButton")

  div.append(task.title, completeButton, removeButton)
  item.append(div)
  list?.append(item)
  console.log("list item appended")
}

document.addEventListener("removeButton", e => {
  e.preventDefault()

  console.log("removeButton activated");
})