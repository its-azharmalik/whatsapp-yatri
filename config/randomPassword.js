const passwordGenerator = ( _len ) => {
    let password = '';
    for (let i = 1; i <= _len ; i++) {
        password += Math.floor(Math.random()*10).toString();
    }
    return password;
}

module.exports = passwordGenerator;