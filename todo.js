var taskId = -1;
var form = document.getElementById('form');
var input = document.getElementById('input');
var list = document.getElementById('list');
list.setAttribute("style", "list-style-type:none;");
console.log('Cookie reading ...');
var indexVar = 1;
console.log(document.cookie.valueOf());
var cookieObject = document.cookie.split('; ').reduce(function (prev, current) {
    var _a = current.split('='), name = _a[0], value = _a.slice(1);
    prev[name] = value.join('=');
    return prev;
}, {});
var i = 0;
while (cookieObject[i] != undefined) {
    console.log("Element #".concat(i, " cookieObject: ") + cookieObject[i]);
    taskId = taskId + 1;
    var newTask = {
        taskId: taskId,
        title: cookieObject[i],
        completed: false
    };
    addListItem(newTask);
    i = i + 1;
}
document.addEventListener("submit", function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null) {
        console.log("no input");
        return;
    }
    console.log("input: " + input.value);
    taskId = taskId + 1;
    var newTask = {
        taskId: taskId,
        title: input.value,
        completed: false
    };
    setCookie("".concat(newTask.taskId), "".concat(newTask.title));
    addListItem(newTask);
});
function addListItem(task) {
    console.log("add list item: " + task.title);
    var item = document.createElement("li");
    var label = document.createElement("label");
    var div = document.createElement("div");
    div.setAttribute("text-align", "center");
    // Complete Button
    var completeButton = document.createElement("button");
    completeButton.textContent = "Completed";
    completeButton.setAttribute("id", "completeButton");
    completeButton.setAttribute("type", "completeButton");
    completeButton.setAttribute("class", "btn btn-primary");
    // Remove Button
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("id", "removeButton");
    removeButton.setAttribute("type", "removeButton");
    removeButton.setAttribute("class", "btn btn-primary");
    div.append(task.title, completeButton, removeButton);
    item.append(div);
    list === null || list === void 0 ? void 0 : list.append(item);
    console.log("list item appended");
}
document.addEventListener("completeButton", function (e) {
    e.preventDefault();
    console.log("completeButton activated");
});
document.addEventListener("removeButton", function (e) {
    e.preventDefault();
    console.log("removeButton activated");
});
/*
 * General utils for managing cookies in Typescript.
 */
function setCookie(name, val) {
    var date = new Date();
    var value = val;
    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}
function deleteCookie(name) {
    var date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
