let input = document.querySelector('#pesquisaInp').value.toLowerCase()
let info = document.querySelector('#info')
let busca = document.querySelector('#btPesquisa')
let foto = document.querySelector('#foto')
let proxima = document.querySelector('#proxima')
let principal = document.querySelector('#principal')
let muda = 0
let vetMuda = []

function refresh(){
	if(busca.innerTEXT == 'Pesquisar Novamente'){
		window.location.reload() 
	}
}

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

function con(url){

	busca.innerHTML = 'Pesquisar Novamente'
	axios.get(url)
	.then(resp => {
		info.innerHTML = `
		<p>Nome: ${resp.data.name}</p>
		<p>Peso: ${resp.data.weight}</p>
		<p>Altura: ${resp.data.height}</p>
		`
		// foto.src = resp.data.sprites.back_female
		Object.keys(resp.data.sprites).forEach(itens => {
			vetMuda.push( resp.data.sprites[itens] )
		})
		// console.log(resp.data)
		foto.src = vetMuda[muda]
		principal.style.display = 'block'
	})
	.catch(err => alert(err))
	.finally( loadStop() )// chama quando tudo acaba

}

function buscar(){
	refresh()
	let url = `https://pokeapi.co/api/v2/pokemon/${input}`
	loadStart()
	setTimeout( function(){ con(url) } , 3000)
}

busca.addEventListener('click', buscar)
proxima.addEventListener('click', mudar)