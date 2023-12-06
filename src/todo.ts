type Task = {
  taskId: number,
  title: string,
  completed: boolean,
}

let taskId = -1;

const form = document.getElementById('form')! as HTMLElement;
const input = document.getElementById('input')! as HTMLInputElement;
const list = document.getElementById('list')! as HTMLUListElement;
list.setAttribute("style", "list-style-type:none;");

console.log('Cookie reading ...');
let indexVar: number = 1;
console.log(document.cookie.valueOf());

let cookieObject = document.cookie.split('; ').reduce((prev, current) => {
  const [name, ...value] = current.split('=');
  prev[name] = value.join('=');
  return prev;
}, {});

let i : number = 0;
while(cookieObject[i] != undefined)
{
  console.log(`Element #${i} cookieObject: ` + cookieObject[i]);

  taskId = taskId + 1;

  const newTask: Task = {
    taskId: taskId,
    title: cookieObject[i],
    completed: false
  }

  addListItem(newTask)

  i = i + 1;
}

document.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null)
  {
    console.log("no input");
    return;
  }

  console.log("input: " + input.value);

  taskId = taskId + 1;

  const newTask: Task = {
    taskId: taskId,
    title: input.value,
    completed: false
  }

  setCookie(`${newTask.taskId}`, `${newTask.title}`)
  
  addListItem(newTask)
})

function addListItem(task: Task){
  console.log("add list item: " + task.title);
  const item = document.createElement("li")
  const label = document.createElement("label")
  const div = document.createElement("div")
  div.setAttribute("text-align", "center")

  // Complete Button
  const completeButton = document.createElement("button")
  completeButton.textContent = "Completed"
  completeButton.setAttribute("id", "completeButton")
  completeButton.setAttribute("type", "completeButton")
  completeButton.setAttribute("class", "btn btn-primary")

  // Remove Button
  const removeButton = document.createElement("button") 
  removeButton.textContent = "Remove"
  removeButton.setAttribute("id", "removeButton")
  removeButton.setAttribute("type", "removeButton")
  removeButton.setAttribute("class", "btn btn-primary")

  div.append(task.title, completeButton, removeButton)
  item.append(div)
  list?.append(item)
  console.log("list item appended")
}

document.addEventListener("completeButton", e => {
  e.preventDefault()

  console.log("completeButton activated");
})

document.addEventListener("removeButton", e => {
  e.preventDefault()

  console.log("removeButton activated");
})

/*
 * General utils for managing cookies in Typescript.
 */
function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  
  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}

function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}