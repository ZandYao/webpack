let hello = function (name) {
	let hello = document.createElement('div')
	if (name) {
		hello.innerHTML = name
	} else {
		hello.innerHTML = '你又开始了'
	}
	return hello
}
module.exports  = hello
