function isPrime(num) {
    if (num < 2) {
        return false;
    }
    for (i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function printNumber() {
    let result = [];
    for (let i = 100; i >= 1; i--) {
        if (isPrime(i)) continue;
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FooBar");
        } else if (i % 3 === 0) {
            result.push("Foo");
        } else if (i % 5 === 0) {
            result.push("Bar");
        } else {
            result.push(i);
        }
    }
    console.log(result.join(' '));
}

printNumber();

