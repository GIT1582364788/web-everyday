var a = 1
function exec(code) {
    var a = 2
    // 1. eval函数。同步，当前作用域。a 2
    // eval(code)  

    // 2. 传过来的字符串当成代码执行。异步，全局作用域。a 1   node运行中这里会报错：Callback must be a function. Received 'console.log("a", a)' 
    // setTimeout(code, 0) 

    // 3. 创建一个script元素，设置元素内容为这个字符串，添加到页面中。同步，全局作用域。 a 1
    // const script = document.createElement('script')
    // script.innerHTML = code
    // document.body.appendChild(script)

    // 4.创建函数，字符串当成参数传进去，表示创建了函数的函数体。同步，全局作用域。建议使用Function，因为上面的方法多创建了一个标签出来。
    const fn = new Function(code)
    fn()

}

exec('console.log("a", a)')
console.log('sync')