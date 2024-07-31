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

addButton.addEventListener("click",addTask);


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
    let resultHTML = ''
    for (let i=0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){

        resultHTML += 
        `<div class = "task">
            <div class = task-done>${taskList[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick = "deleteTask()">Delete</button>
            </div>
        </div>`
        
        } else { 
        
        resultHTML += 
        `<div class = "task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick = "deleteTask()">Delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    }
}

function toggleComplete(id){
    
    for(let i=0; i < taskList.length; i++){
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

function deleteTask(){
    console.log("삭제")
}
