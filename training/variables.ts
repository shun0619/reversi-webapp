const v1: number =1;
console.log(v1);


// const arr1 = [];
// arr1.push(1);

const arr2: number[] = [];
arr2.push(2);
console.log(arr2);

const names = ['Alice', 'Bob', 'Carol'];

const users = names.map((name, i) => {
  return {
    id: i,
    name: name,
  }
})

const oddIdUsers = users.filter(user => user.id % 2 === 1);
console.log(oddIdUsers);
