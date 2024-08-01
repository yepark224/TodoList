//유저가 값을 입력한다
// + 버튼을 클릭하면 , 할일이 추가된다
// 유저가 delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 밑줄이 간다.
// 1.check 버튼을 클릭하는 순간 true false 로 변경
// 2. true 이면 끝난걸로 간주하고 밑줄 보여주기
// 3.false 이면 안끝난걸로 간주하고 그대로.

//진행중 끝남 탬을 누르면, 언더바가 이동한다.
// 완료 탭은 완료 아이템만, 진행중은 진행중 아이템만 있다. 
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("tab-underline");

console.log(tabs);


addButton.addEventListener("click",addTask);
for (let i =1;i < tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

function addTask(){
    let task = {
        id: randomIDGenerate() ,
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render(); 
}

function render(){
    let list= [];
    if(mode === "all"){
       list = taskList;
    }else {
        list = filterList;
    }


    let resultHTML = ''
    for (let i=0; i < list.length; i++){
        if(list[i].isComplete == true){

        resultHTML += 
        `<div class = "task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                <button onclick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        
        } else { 
        
        resultHTML += 
        `<div class = "task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                <button onclick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
   
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    
    for( let i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            // ! 반댓값을 넣어준다.
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(e){
    // 함수가 이벤트 핸들러로 호출된 경우
    if (e) {
        // 모드 설정
        mode = e.target.id;
        //밑줄조정
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      } 

    filterList = []
    if (mode === "all"){
        render();
    }else if (mode === "ongoing"){
        for (let i = 0; i <taskList.length; i++){
            if (taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
    render();    
    console.log("진행중",filterList);
    }else if (mode === "done") {
        for (let i = 0; i <taskList.length; i++){
            if (taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
    render();  
    }
    
}