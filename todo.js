var taskId = -1;
var form = document.getElementById('form');
var input = document.getElementById('input');
var list = document.getElementById('list');
list.setAttribute("style", "list-style-type:none;");
var clear = document.getElementById('clear');
var completeButton = document.getElementById('completeButton');
var removeButton = document.getElementById('removeButton');
console.log('Cookie reading ...');
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
clear.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Delete all cookies.");
    taskId = 0;
    deleteAllCookies();
    // Refresh the page
    location.reload();
});
function addListItem(task) {
    console.log("add list item: " + task.title);
    var item = document.createElement("li");
    var label = document.createElement("label");
    var div = document.createElement("div");
    div.className = "row g-5";
    // Text
    var text = document.createElement("h3");
    text.setAttribute("id", "text");
    text.setAttribute("type", "text");
    text.setAttribute("class", "justify-content-center col-xs-4 col-xs-offset-1 col-sm-4 col-md-offset-1 col-md-4 col-md-offset-1");
    text.textContent = task.title;
    // Complete Button
    var completeButton = document.createElement("button");
    completeButton.textContent = "Completed";
    completeButton.setAttribute("id", "completeButton");
    completeButton.setAttribute("type", "completeButton");
    completeButton.setAttribute("class", "btn btn-primary col-xs-4 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-1");
    // Remove Button
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("id", "removeButton");
    removeButton.setAttribute("type", "removeButton");
    removeButton.setAttribute("class", "btn btn-primary col-xs-4 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-1");
    div.append(text, completeButton, removeButton);
    item.append(div);
    list === null || list === void 0 ? void 0 : list.append(item);
    console.log("list item appended");
}
completeButton === null || completeButton === void 0 ? void 0 : completeButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("completeButton activated");
});
removeButton === null || removeButton === void 0 ? void 0 : removeButton.addEventListener("click", function (e) {
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
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i_1 = 0; i_1 < cookies.length; i_1++) {
        var cookie = cookies[i_1];
        var eqPos = cookie.indexOf("=");
        var name_1 = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name_1 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
