//DOM요소를 선택해야 한다.
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let tasks = [];

//addButton이 클릭되면 이벤트가 발생하는 리스너를 추가해주세요.
addButton.addEventListener('click', addTask);
/*
//addTask 함수를 만든다.
function addTask() {
  // 인풋창에 입력된 텍스트가 있어야 한다. taskText
  const taskText = taskInput.value.trim(); //trim : 문자열 공백제거
  //li태그를 생성한다. taskItem
  const taskItem = document.createElement('li');
  //taskItem 텍스트(taskText)를 대입한다.
  taskItem.textContent = taskText;
  //taskItem을 ul 태그 밑에 자식 태그로 추가한다.
  taskList.appendChild(taskItem);
  //추가되고 난 이후 input창 값을 비워줍니다(초기화)
  taskInput.value = '';
  //생성한 taskItem에 이벤트리스너를 추가(click -> completeTask)해주세요
  taskItem.addEventListener('click', completeTask);
}
//할일을 완료했을 때 사용하는 함수
function completeTask(event) {
  const taskItem = event.target;
  //할일 완료했을 대 중간 줄이 쫙! 글자색도 연하게!
  //(CSS selector .complete)
  taskItem.classList.add('complete');
  taskItem.addEventListener('click', removeTask);
}

//할일 삭제
function removeTask(event) {
  const taskItem = event.target;
  taskItem.parentNode.removeChild(taskItem);
}
*/
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    tasks.push(taskText);
    saveTask(tasks);
    taskInput.value = '';
  }
}
//리스트(Todo) 생성 함수 선언
function createTaskItem(taskText) {
  //li 태그 생성하여 taskItem 변수를 지정
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  taskItem.addEventListener('click', completeTask);

  //버튼 태그 생성
  const removeButton = document.createElement('button');
  //삭제 버튼
  removeButton.textContent = '삭제💢';
  removeButton.addEventListener('click', removeTask);
  taskItem.appendChild(removeButton);
  return taskItem;
}

//할일 완료 함수
function completeTask(event) {
  //closest : 가장 가까운 00태그(여기서는 li)를 찾아라
  const taskItem = event.target.closest('li');
  taskItem.classList.toggle('completed');
}

//할일 삭제 함수
function removeTask(event) {
  const taskItem = event.target.closest('li');
  taskItem.parentNode.removeChild(taskItem);
}

//로컬 저장소에 저장하기 (saveTask())
function saveTask(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//로컬 저장소에서 불러오기(loadTask())
function loadTask() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = JSON.parse(savedTasks);

  //생성해서 화면에다가 그려줘야죠.
  for (let i = 0; i < tasks.length; i++) {
    const taskItem = createTaskItem(taskText[i]);
    taskList.appendChild(taskItem);
  }
}

//창이 새로고침이나, 처음 로딩되었을 때, 불러오기를 실행
window.addEventListener('load', loadTask);
