var nameVar = 'Luis';
// I can reassign a var variable.
nameVar = 'Felipe';
// I can even redfine it without error.
var nameVar = 'Felipe';
console.log('nameVar', nameVar);

let nameLet = 'Maria';
nameLet = 'Camila';
// I can reassign let variables but not redefine them.
console.log('nameLet', nameLet);

const nameConst = 'Frank';
// I can't redefine or reassign a const. Small exception here with objects.
console.log('nameConst', nameConst);

// SCOPE
function getPetName() {
  var petName = 'Hal';
  // const petName = 'Hal';
  // let petName = 'Hal';

  return petName;
}

getPetName();
// console.log(petname); It's not reachable from here. var, const and let are function scoped

// Block scoping
var fullName = 'Luis Rojas';
if (fullName) {
  var firstName = fullName.split(' ')[0];
  // const firstName = fullName.split(' ')[0];
  // let firstName = fullName.split(' ')[0];
  console.log(firstName);
}
// I can access the var one because an if is not a function but the const and let i can't because they are blocked-scoped.

console.log(firstName);
