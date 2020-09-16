const input = document.getElementById('input'),
      buttonadd = document.getElementById('add'),
      list = document.getElementById('lists'),
      buttonsort = document.getElementById('sort')
      data = storage('todo');

class Todo {
    constructor() {
        this.data=[];
    }

    show(){
        list.innerHTML = "";
        let todoMap = this.data.map((val, i, arr) => {
            //val.completed = true;
            const {text, date, completed} = val; // menggunakan es6 destructor
            return list.innerHTML += 
            `<li>
            ${val.completed ? '<s>' : ''}${i + 1}. ${text} | ${date} | ${completed} ${val.completed ? '</s>' : ''}
                <button id="removeItem" noIndex="${i}" >🗑️</button>
                <button id="editItem" noIndex="${i}" >✏️</button>
                <button id="completeItem" noIndex="${i}" >✔️</button>
            </li>`
        })

        let remove = document.querySelectorAll('#removeItem');
        let complete = document.querySelectorAll('#completeItem');
        let edit = document.querySelectorAll("#editItem");

        remove.forEach(element => {
            element.onclick = () => {
                console.log(remove);
                this.data.splice(element.getAttribute("noIndex"), 1);
                this.show();
            }
        })

        complete.forEach(element => {
            element.onclick = () => {
                console.log(complete);
                this.data[element.getAttribute("noIndex")].completed = complete ? true : false;
                this.show();
            }
        })

        edit.forEach(element => {
            element.onclick = () => {
                console.log(edit);
                let elem = element.parentNode;
                console.log(elem);
               // this.data[element.getAttribute("noIndex")] = elem;
                elem.innerHTML = `<input type="text" noIndexDone="${element.getAttribute("noIndex")}">`
                elem.onkeypress = () => {
                    todo.done(event)
                }
            }
        })
    }

    done(datainput) {
        if (datainput.which == 13) { 
           // console.log(done);
            this.data[datainput.target.getAttribute("noIndexDone")].text = datainput.target.value; 
            //   storage('todo', todo, true);
            this.show(); 
        }
    }

    setTodo(value){
        
        this.data.push(
            {
                text: value,
                date: new Date(),
                completed: false,
            }
        )
        this.show();
    }
};

let todo = new Todo;
buttonadd.addEventListener('click', () => todo.setTodo(input.value));
    




function storage(name, data = null, set = false){
    if(set){
        localStorage.setItem(name, JSON.stringify(data));
        return true;
    }else{
        return JSON.parse(localStorage.getItem(name));
    }
}