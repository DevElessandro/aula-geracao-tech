
function abrirModal(){
    overlay.classList.add("active");
    tarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    tarefa.classList.remove("active");
}

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res =>{
        inserirTarefas(res);
    })
}buscarTarefas();

function inserirTarefas(listaTarefas){
    if(listaTarefas.length > 0){
           lista.innerHTML=""
        listaTarefas.map(tarefa =>{
            lista.innerHTML +=`
            <li>
            <h3>${tarefa.titulo}</h3>
                <p>                    
                ${tarefa.descricao}
                </p>
                <div class="actions">
                    <box-icon name='trash' onClick="deletarTarefa(${tarefa.id})"></box-icon>
                </div>
               
                </li>`;
        })
    }

}
//--Endpoint CREATE--//
function novaTarefa(){
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }
    fetch("http://localhost:3000/tarefas", {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(tarefa)

    })
    .then(res => res.json())
    .then(res =>{
        fecharModal();
        buscarTarefas();
    })
  
}
//--Endpoint DELETE--//
function deletarTarefa(id){
fetch(`http://localhost:3000/tarefas/${id}`,{
        method:"DELETE",
    })
    .then(res => res.json()
    .then(res => {
        alert("Tarefa deletada com suceeso!");
        buscarTarefas();
        let form = document.querySelector("#criarTarefa form");
        form.reset();
    }))
}
//--Endpoint BUSCA--//
function pesquisarTarefas(){
let lis = document.querySelectorAll("ul li");
console.log(lis);
if(busca.value.length > 0){
    lis.forEach(li =>{
        if(!li.children[0].innerText.includes(busca.value)){
            li.classList.add('oculto');
        }else{
            li.classList.remove('oculto');
        }
    })
}else{
    lis.forEach(li =>{
        li.classList.remove('oculto');
    })

}
}
