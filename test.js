const PasswordVerify = require("./index");
const assert = require('assert');

console.log("Testing the happy path...");

let pv       = new PasswordVerify();
let password = 'testing';
let wrong    = 'wrong';
let pass     = pv.hashPassword(password);

assert(pv.verifyPassword(password, pass), 'Verify password failed to identify a correct password.');
assert(!pv.verifyPassword(wrong, pass), 'Verify password failed to identify an incorrect password.');

console.log("Testing special characters and a different hash algorithm...");

pv       = new PasswordVerify({algorithm: 'sha512'});
password = '409asda;\'$$$$())  +=`xx`';
wrong    = '@#$%$#%$^&*^%&!!\'"'
pass     = pv.hashPassword(password);

assert(pv.verifyPassword(password, pass), 'Verify password failed to identify a correct password using sha512.');
assert(!pv.verifyPassword(wrong, pass), 'Verify password failed to identify an incorrect password using sha512.');

console.log("Testing a long password...");

pv       = new PasswordVerify({saltLength: 256});
password = "!@#$%^&*()_+`{}|';:/? It's gonna take a lot to drag me away from you \nThere's nothing that a hundred men or more could ever do\nI bless the rains down in Africa";
wrong    = `Yo, I'll tell you what I want, what I really, really want So tell me what you want, what you really, really want I'll tell you what I want, what I really, really want So tell me what you want, what you really, really want I wanna, (ha) I wanna, (ha) I wanna, (ha) I wanna, (ha) I wanna really, really, really wanna zigazig ah`
pass     = pv.hashPassword(password);

assert(pv.verifyPassword(password, pass), 'Verify password failed to identify a correct long password.');
assert(!pv.verifyPassword('wrong', pass), 'Verify password failed to identify an incorrect long password.');

console.log("Success!");