
let info = document.querySelector('#info')
let busca = document.querySelector('#btPesquisa')
let foto = document.querySelector('#foto')
let proxima = document.querySelector('#proxima')
let principal = document.querySelector('#principal')
let muda = 0
let vetMuda = []

function mudar(){
	muda ++
	if(muda >= 7){
		muda = 0
	}
	if( vetMuda[muda] == null ){
		muda ++
	}
	foto.src = vetMuda[muda]
}
function loadStart(){
	document.querySelector('#loading').style.display = 'block'
	principal.style.display = 'none'
}

function loadStop(){
	document.querySelector('#loading').style.display = 'none'
	axios.isCancel()
}

function addInfo(resp, local){
	document.querySelector('#nome').value = resp.data.name
	document.querySelector('#peso').value = resp.data.weight
	document.querySelector('#altura').value = resp.data.height
		
}

function con(url){
	vetMuda = []
	axios.get(url)
	.then(resp => {
		// info.innerHTML = 
		addInfo(resp, info)
		loadStop()
		Object.keys(resp.data.sprites).forEach(itens => {
			vetMuda.push( resp.data.sprites[itens] )
		})
		foto.src = vetMuda[muda]
		principal.style.display = 'block'
	})
	.catch(err => {
		alert(err)
		loadStop()
	})
	.finally(  )// chama quando tudo acaba
}

function buscar(){
	let input = document.querySelector('#pesquisaInp').value.toLowerCase()
	let url = `https://pokeapi.co/api/v2/pokemon/${input}`
	loadStart()
	setTimeout( function(){ con(url) } , 3000)
}

busca.addEventListener('click', buscar)
proxima.addEventListener('click', mudar)

