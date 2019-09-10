var fs = require('fs')
var path = require('path')

const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]

const dbPath = path.join(__dirname,'db')

// /是用来转义，使用/，所以有两个//

ensureDb()

const list = fetch()
const n = content

switch(verb){
    case 'add':
        addTask(list,content) 
        break;
    case 'list':
        break;
    case 'delete':
        removeTask(list,n)
        break;
    case 'done':
        taskDone(list,n)
        break;
    case 'edit':
        editTask(list,n,content2)
        break;
    default:
        console.log('我不知道你想做什么')
        break;
}
display(list)
if(verb !== 'list'){
    save(list)
}

function ensureDb(){//确保文件一定存在，如果有报错，就执行catch
    try{
        fs.statSync(dbPath) //文件存在，什么也不做
    }
    catch (error){
        fs.writeFileSync(dbPath,'') //文件不存在，就创建文件
    }
    //到这里，文件一定存在
}
function save(list){ //保存到数据库
    fs.writeFileSync(dbPath,JSON.stringify(list))
}
function fetch(){ //list赋值逻辑
    const fileContent = fs.readFileSync(dbPath).toString()
    let list
    try{
        list = JSON.parse(fileContent) || []
    }
    catch(error){
        list = []
    }
    return list
}
function addTask(list,content){ //添加todo到list
    list.push([content,false])
}
function removeTask(list,n){//从list移除todo
    list.splice(n-1,1)
}
function taskDone(list,n){ //完成某个todo
    list[n-1][1] = true
}
function editTask(list,n,content2){ //编辑某个todo
    list[n-1][0] = content2
}
function display(list){ //打印list
    for(let i = 0; i<list.length; i++){
        const mark = list[i][1] === true?'[O]':'[X]'
        console.log( mark + ' ' + '任务内容：' + list[i][0])
    }
}

