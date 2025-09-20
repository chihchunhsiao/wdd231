// import the default object from course.mjs
import byuiCourse from './course.mjs'; 

console.log(byuiCourse); // testing only

// import the populateSelection funciton from the sections module.
// Note that the function is encased in squiggly brackets because it is a named export. The brackets are not
// required for a single import, but recommended for clarity. This function is not the default export of the module.
import {populateSections} from './sections.mjs';
// **Call the function with the specific data
populateSections(byuiCourse.sections);

// import the named function exports from the output file.
// Note that the two functions are encased in squiggly brackets and separated with a comma(,).

import { setTitle, renderSections} from "./output.mjs";
// **Call the function with the specific data
setTitle (byuiCourse);
renderSections (byuiCourse.sections);


// **Add renderSections(this.sections); 
// to both event listeners in order to update the output after the enroll or drop button is clicked.
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);//pharse string to number
  byuiCourse.changeEnrollment(sectionNum);// changeEnrollment is a method in the byuiCourse
  renderSections(byuiCourse.sections);//new add
});
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);//new add
});




