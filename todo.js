var fs = require('fs')

const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]
const dbPath = 'C:\\Users\\win\\desktop\\node-demo-1\\db' 
// nodejs中/是用来转义的，使用/就需要/来转义，所以有两个//

function save(list){ //保存到数据库
    fs.writeFileSync(dbPath,JSON.stringify(list))
}

function fetch(){
    const fileContent = fs.readFileSync(dbPath).toString()
    list = JSON.parse(fileContent)
    return list
}
function addTask(list,content){
    list.push([content,false])
}
function removeTask(list,n){
    list.splice(n-1,1)
}
function taskDone(list,n){
    list[n-1][1] = true
}
function editTask(list,n,content2){
    list[n-1][0] = content2
}

//确保文件一定存在
try{//如果有报错，就执行catch
    fs.statSync(dbPath)
    console.log('文件存在，就往下执行')
}
catch (error){
    console.log('文件不存在，就创建文件')
    fs.writeFileSync(dbPath,'') //创建数据库文件
}
console.log('到这里，文件一定存在')

let list,n

switch(verb){
    case 'add':
        list = fetch()
        addTask(list,content)
        save(list)     
        break;
    case 'list':
        list = fetch()
        console.log(list)
        break;
    case 'delete':
        list = fetch()
        n = content //从1开始
        removeTask(list,n)
        save(list)
        break;
    case 'done':
        list = fetch()
        n = content //从1开始
        taskDone(list,n)
        save(list)
        break;
    case 'eidt':
        list = fetch()
        n = content //从1开始
        editTask(list,n,content2)
        save(list)
        break;
    default:
        console.log('你的动词是：' ,verb)
        console.log('我不知道你想干嘛')
        break;
}




