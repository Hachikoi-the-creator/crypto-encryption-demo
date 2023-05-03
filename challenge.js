// type List = string[]
// type SortBy = "name" | "age" | "breed"
// type SortOrder = "asc" | "desc"

// if anything is invalid, return null
// default value ofr better code completition since docstring didn't work
/**
 * @dev sorts depending on prop given
 * @param {String} prev
 * @param {String} curr
 * @param {String} prop (name, age, breed)
 */
function sortAsc(prev, curr, prop) {
  if (prev[prop] < curr[prop]) return -1;
  if (prev[prop] < curr[prop]) return 1;
  return 0;
}

function sortAscStrings(prev, curr, prop) {
  // localCompare for working with emojis... will never return 0 tho
  if (prev[prop].localCompare(curr[prop])) return -1;
  if (!prev[prop].localCompare(curr[prop])) return 1;
  return 0;
}

const sortStringAsc = (a, b) => {};
/**
 * @dev sorting an array of cats
 * @param {String} sortBy
 * @param {String} sortOrder
 */
function kittySort(list = [], sortBy = "", sortOrder = "") {
  // pre allocate enough space to store the sorted arr
  let sortedArr = Array(list.length).fill(0);

  if (sortBy === "age") {
    const sorted = list.sort();
    return sortOrder === "asc" ? sorted : sorted.reverse();
  }

  // if it's not by age, then I need to comapre strings thus this is the best option
  sortedArr = list.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  return sortOrder === "asc" ? sortedArr : sortedArr.reverse();
}

// ! failing test
// "should sort by breed in ascending order when sortBy is breed and sortOrder is asc", () => {
const list = [
  { name: "Luna", age: 3, breed: "Persian" },
  { name: "Whiskers 🤣", age: 2, breed: "Siamese" },
  { name: "Fluffy 🙃", age: 1, breed: "British Shorthair" },
];
const ascRes = [
  { name: "Fluffy", age: 1, breed: "British Shorthair" },
  { name: "Luna", age: 3, breed: "Persian" },
  { name: "Whiskers", age: 2, breed: "Siamese" },
];
const descRes = [
  { name: "Whiskers", age: 2, breed: "Siamese" },
  { name: "Luna", age: 3, breed: "Persian" },
  { name: "Fluffy", age: 1, breed: "British Shorthair" },
];

const result = kittySort(descRes, "breed", "asc");
const comparision = descRes.map((ex, i) => {
  return { name: ex.age === result[i].age, nums: [ex.age, result[i].age] };
});
console.log(comparision);
// ! full testing
const chai = require("chai");
const expect = chai.expect;

const kittySort = require("../kittySort");
const assert = require("chai").assert;

describe("Meowtel Purrfect Kitties Organizer - Tests", () => {
  it("should sort the list by name in ascending order", function () {
    const list = [
      { name: "Max", age: 2, breed: "Persian" },
      { name: "Fluffy", age: 4, breed: "Siamese" },
      { name: "Whiskers", age: 1, breed: "Calico" },
    ];
    const sortBy = "name";
    const sortOrder = "asc";
    const result = kittySort(list, sortBy, sortOrder);

    assert.deepEqual(result, [
      { name: "Fluffy", age: 4, breed: "Siamese" },
      { name: "Max", age: 2, breed: "Persian" },
      { name: "Whiskers", age: 1, breed: "Calico" },
    ]);
  });

  it("should sort the list by age in descending order", function () {
    const list = [
      { name: "Fluffy", age: 2, breed: "Persian" },
      { name: "Max", age: 4, breed: "Siamese" },
      { name: "Whiskers", age: 1, breed: "Calico" },
    ];
    const sortBy = "age";
    const sortOrder = "desc";
    const result = kittySort(list, sortBy, sortOrder);

    assert.deepEqual(result, [
      { name: "Max", age: 4, breed: "Siamese" },
      { name: "Fluffy", age: 2, breed: "Persian" },
      { name: "Whiskers", age: 1, breed: "Calico" },
    ]);
  });

  it("should sort by breed in ascending order when sortBy is breed and sortOrder is asc", () => {
    const list = [
      { name: "Luna", age: 3, breed: "Persian" },
      { name: "Whiskers", age: 2, breed: "Siamese" },
      { name: "Fluffy", age: 1, breed: "British Shorthair" },
    ];
    const result = kittySort(list, "breed", "asc");
    const expected = [
      { name: "Fluffy", age: 1, breed: "British Shorthair" },
      { name: "Luna", age: 3, breed: "Persian" },
      { name: "Whiskers", age: 2, breed: "Siamese" },
    ];
    assert.deepEqual(result, expected);
  });

  it("should sort by breed in ascending order", function () {
    const cats = [
      { name: "Felix", age: 5, breed: "Bengal" },
      { name: "Garfield", age: 3, breed: "Persian" },
      { name: "Tom", age: 2, breed: "Calico" },
      { name: "Socks", age: 4, breed: "Siamese" },
      { name: "Mittens", age: 1, breed: "Siamese" },
      { name: "Smokey", age: 6, breed: "Bengal" },
      { name: "Tigger", age: 2, breed: "Calico" },
      { name: "Boots", age: 3, breed: "Persian" },
      { name: "Muffin", age: 1, breed: "Bengal" },
      { name: "Whiskers", age: 2, breed: "Calico" },
    ];

    const expected = [
      { name: "Felix", age: 5, breed: "Bengal" },
      { name: "Smokey", age: 6, breed: "Bengal" },
      { name: "Muffin", age: 1, breed: "Bengal" },
      { name: "Tom", age: 2, breed: "Calico" },
      { name: "Tigger", age: 2, breed: "Calico" },
      { name: "Whiskers", age: 2, breed: "Calico" },
      { name: "Garfield", age: 3, breed: "Persian" },
      { name: "Boots", age: 3, breed: "Persian" },
      { name: "Socks", age: 4, breed: "Siamese" },
      { name: "Mittens", age: 1, breed: "Siamese" },
    ];

    const result = kittySort(cats, "breed", "asc");
    assert.deepEqual(result, expected);
  });

  it("should sort by name, ignoring case", function () {
    const list = [
      { name: "Fluffy", age: 4, breed: "Siamese" },
      { name: "whiskers", age: 1, breed: "Calico" },
      { name: "max", age: 2, breed: "Persian" },
    ];
    const expected = [
      { name: "Fluffy", age: 4, breed: "Siamese" },
      { name: "max", age: 2, breed: "Persian" },
      { name: "whiskers", age: 1, breed: "Calico" },
    ];
    assert.deepEqual(kittySort(list, "name", "asc"), expected);
  });

  it("should return null if no list is provided", function () {
    const result = kittySort();
    assert.isNull(result);
  });

  it("should return null if sortBy parameter is invalid", function () {
    const list = [
      { name: "Fluffy", age: 2, breed: "Persian" },
      { name: "Max", age: 4, breed: "Siamese" },
    ];
    const sortBy = "color";
    const sortOrder = "asc";
    const result = kittySort(list, sortBy, sortOrder);
    assert.isNull(result);
  });

  it("should return null if sortOrder parameter is invalid", function () {
    const list = [
      { name: "Fluffy", age: 2, breed: "Persian" },
      { name: "Max", age: 4, breed: "Siamese" },
    ];
    const sortBy = "age";
    const sortOrder = "ascending";
    const result = kittySort(list, sortBy, sortOrder);
    assert.isNull(result);
  });

  it("should sort list of kitties with duplicate entries, case-insensitive", function () {
    const input = [
      { name: "Fluffy", age: 2, breed: "Siamese" },
      { name: "max", age: 4, breed: "Persian" },
      { name: "whiskers", age: 1, breed: "Calico" },
      { name: "Max", age: 3, breed: "Sphynx" },
      { name: "Fluffy", age: 1, breed: "Bengal" },
      { name: "whiskers", age: 2, breed: "Persian" },
    ];
    const expectedOutput = [
      { name: "Fluffy", age: 2, breed: "Siamese" },
      { name: "Fluffy", age: 1, breed: "Bengal" },
      { name: "max", age: 4, breed: "Persian" },
      { name: "Max", age: 3, breed: "Sphynx" },
      { name: "whiskers", age: 1, breed: "Calico" },
      { name: "whiskers", age: 2, breed: "Persian" },
    ];
    assert.deepEqual(kittySort(input, "name", "asc"), expectedOutput);
  });

  it("should sort the kitties by name with weird characters", function () {
    const list = [
      { name: "Cat 🐱", age: 4, breed: "Scottish Fold" },
      { name: "Whiskers", age: 1, breed: "Calico" },
      { name: "0FDFD", age: 3, breed: "Sphynx" },
      { name: "Meowmie 😻", age: 2, breed: "Siamese" },
    ];
    const sortedList = kittySort(list, "name", "asc");
    console.log(sortedList);
    expect(sortedList).to.deep.equal([
      { name: "0FDFD", age: 3, breed: "Sphynx" },
      { name: "Cat 🐱", age: 4, breed: "Scottish Fold" },
      { name: "Meowmie 😻", age: 2, breed: "Siamese" },
      { name: "Whiskers", age: 1, breed: "Calico" },
    ]);
  });
});
