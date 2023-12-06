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

const clear = document.getElementById('clear')! as HTMLElement;
const completeButton = document.getElementById('completeButton')! as HTMLElement;
const removeButton = document.getElementById('removeButton')! as HTMLElement;

console.log('Cookie reading ...');
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

clear.addEventListener("click", e => {
  e.preventDefault()

  console.log("Delete all cookies.");

  taskId = 0

  deleteAllCookies()

  // Refresh the page
  location.reload();
})

function addListItem(task: Task){
  console.log("add list item: " + task.title);
  const item = document.createElement("li")
  const label = document.createElement("label")
  const div = document.createElement("div")
  div.className = "row g-5"

  // Text
  const text = document.createElement("h3")
  text.setAttribute("id", "text")
  text.setAttribute("type", "text")
  text.setAttribute("class", "justify-content-center col-xs-4 col-xs-offset-1 col-sm-4 col-md-offset-1 col-md-4 col-md-offset-1")
  text.textContent = task.title
  
  // Complete Button
  const completeButton = document.createElement("button")
  completeButton.textContent = "Completed"
  completeButton.setAttribute("id", "completeButton")
  completeButton.setAttribute("type", "completeButton")
  completeButton.setAttribute("class", "btn btn-primary col-xs-4 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-1")

  // Remove Button
  const removeButton = document.createElement("button") 
  removeButton.textContent = "Remove"
  removeButton.setAttribute("id", "removeButton")
  removeButton.setAttribute("type", "removeButton")
  removeButton.setAttribute("class", "btn btn-primary col-xs-4 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-1")

  div.append(text, completeButton, removeButton)
  item.append(div)
  list?.append(item)
  console.log("list item appended")
}

completeButton?.addEventListener("click", e => {
  e.preventDefault()

  console.log("completeButton activated");
})

removeButton?.addEventListener("click", e => {
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

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}