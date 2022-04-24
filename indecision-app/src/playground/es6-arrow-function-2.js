// arguments object - no longer bound with arrow functions
/* const add = function (a, b) {
    console.log(arguments); // Prints all arguments passed to a function;
    return a + b;
} */

const add = (a, b) => {
  // console.log(arguments); throws error: argument not defined.
  return a + b;
};
console.log(add(55, 1));

// this keyword - no longer bound
const user = {
  name: 'Luis',
  cities: ['Cali', 'Medellin', 'Bogota'],
  // Another valid way to define a function in an object
  printPlacesLived() {
    return this.cities.map((city) => this.name + ' has lived in ' + city);

    /* this.cities.forEach((city) => {
            console.log(this.name + ' has lived in ' + city);
        }); */
  },
  /* printPlacesLived: function () {
        // When we assign an anonymous function to an object, 'this' is bound to the object
        this.cities.forEach(function (city) {
            // When we create an anonymous function like this, 'this' is set to undefined. Next line throws error
            console.log(this.name + 'has lived in ' + city);
        });
        this.cities.forEach((city) => {
            // With Arrow functions, 'this' is bound to the context where it was created. So in this case, to the parent of this function.
            console.log(this.name + ' has lived in ' + city);
        });
    } */
  // This is not a good place to use an arrow function because it will bind the 'this' to the parent scope
  // (which is not 'user' but instead the global since it's the next parent scope) and it will throw error since 'cities
  // doesn't exist there.
  /* printPlacesLived: () => {
        this.cities.forEach((city) => {
            console.log(this.name + ' has lived in ' + city);
        });
    } */
};

console.log(user.printPlacesLived());

// Challenge are
const multiplier = {
  numbers: [10, 20, 30],
  multiplyBy: 3,
  multiply() {
    return this.numbers.map((number) => number * this.multiplyBy);
  },
};
console.log(multiplier.multiply());
