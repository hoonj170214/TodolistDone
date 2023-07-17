//DOM요소를 선택해야 한다.
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let tasks = []; //배열 값은 바뀔 수 있어야 하기 때문에 const => let

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
    // input 태그 안에 넣은 글자들을 li로 바꿔서 taskItem에 저장
    const taskItem = createTaskItem(taskText);
    // ul태그(taskList에 taskItem(input 태그 안에 넣은 글자를 li로 바꾼것)을 자식으로 추가
    taskList.appendChild(taskItem);
    // 배열(tasks)안에 input에 넣은 글자들을 푸시
    tasks.push(taskText);
    // 로컬 저장소에 저장
    saveTask(tasks);
    // input창의 값을 없애기
    taskInput.value = '';
  }
}
//리스트(Todo) 생성 함수 선언
function createTaskItem(taskText) {
  //li 태그 생성하여 taskItem 변수에 지정
  const taskItem = document.createElement('li');
  // input 태그 안에 넣은 글자들을 textItem변수에 저장
  taskItem.textContent = taskText;
  //li태그(taskItem)을 클릭하면 completeTask를 실행하는 이벤트 핸들러
  taskItem.addEventListener('click', completeTask);

  //버튼 태그 생성
  const removeButton = document.createElement('button');
  //삭제 버튼
  //'삭제'라는 글자를 버튼의 텍스트에 저장
  removeButton.textContent = '삭제💢';
  //삭제 버튼을 클릭하면 removeTask를 실행하는 이벤트핸들러
  removeButton.addEventListener('click', removeTask);
  // taskItem(li 태그 단체)에 removeButton을 등록
  taskItem.appendChild(removeButton);
  // li 태그 단체, 묶음으로 반환
  return taskItem;
}

//할일 완료 함수
function completeTask(event) {
  //closest : 가장 가까운 00태그(여기서는 li)를 찾아라
  //li에 이벤트가 일어난 타겟과 가장 가까운 것을 taskItem(이벤트가 일어난 li태그 하나)에 저장
  const taskItem = event.target.closest('li');
  // 이벤트가 일어난 하나의 li 태그에 complete class를 추가(똑같은 class가 있으면 추가 안하고, 없으면 추가)
  taskItem.classList.toggle('complete');
}

//할일 삭제 함수
function removeTask(event) {
  // 이벤트가 일어난 타겟과 가장 가까운 li 태그를 taskItem에 저장
  const taskItem = event.target.closest('li');
  // taskItem의 부모노드(ul)에 자녀를 없앰(이벤트가 일어난 타겟 li태그)
  taskItem.parentNode.removeChild(taskItem);
}

//로컬 저장소에 저장하기 (saveTask())
function saveTask(tasks) {
  // 로컬스토리지에 아이템을 세팅(배열, 배열을 JSON문자열 형태로 반환)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//로컬 저장소에서 불러오기(loadTask())
function loadTask() {
  //로컬 스토리지에 tasks배열에 있는 값을 savedTasks에 저장
  const savedTasks = localStorage.getItem('tasks');
  // savedTasks에 값이 있으면(true), 값이 없으면 false
  //로컬저장소에 tasks가 있는 경우만 실행
  if (savedTasks) {
    // savedTasks(tasks배열)에 값을 parse(JSON 문자열을 받아서 자바스크립트 객체로 변환)해서 tasks(배열)에 저장
    tasks = JSON.parse(savedTasks);

    //생성해서 화면에다가 그려줘야죠.
    //배열의 길이만큼 반복
    for (let i = 0; i < tasks.length; i++) {
      // 배열요소의 인덱스 만큼 li태그를 만들어서 taskItem에 저장
      const taskItem = createTaskItem(taskText[i]);
      // taskItem(li태그)를 taskList(ul)태그에 저장
      taskList.appendChild(taskItem);
    }
  }
}

//창이 새로고침이나, 처음 로딩되었을 때, 불러오기를 실행
window.addEventListener('load', loadTask);
