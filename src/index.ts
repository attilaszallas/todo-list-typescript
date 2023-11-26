type Task = {
  title: string,
  completed: boolean,
}

const list = document.getElementById('list')! as HTMLUListElement;
const form = document.getElementById('form')! as HTMLElement;
const input = document.getElementById('input')! as HTMLInputElement;

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
  console.log("add list item" + task.title);
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  console.log("list item appended")
}