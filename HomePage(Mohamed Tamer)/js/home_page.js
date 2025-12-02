
let btnopen = document.getElementById('open');
let btnclose = document.getElementById('close');

let container = document.querySelector('.container');
let left_nav = document.getElementById('left_nav');

btnclose.onclick = function(){

container.classList.add('hide');

this.classList.add('hide');

btnopen.classList.remove('hide');
}

btnopen.onclick = function(){

this.classList.add('hide');
btnclose.classList.remove('hide');
container.classList.remove('hide');

}

