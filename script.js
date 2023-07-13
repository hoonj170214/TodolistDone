//DOM요소를 선택해야 한다.
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

//addButton이 클릭되면 이벤트가 발생하는 리스너를 추가해주세요.
addButton.addEventListener('click', addTask);

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