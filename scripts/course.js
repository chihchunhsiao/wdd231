// 1. courses array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// 2. get HTML elements
const courseListContainer = document.getElementById('course-list');
const showAllBtn = document.getElementById('showAll');
const showWDDBtn = document.getElementById('showWDD');
const showCSEBtn = document.getElementById('showCSE');

// Add a new element to display the total credits
const totalCreditsDisplay = document.createElement('h3');
totalCreditsDisplay.id = 'total-credits-display';
totalCreditsDisplay.textContent = 'Total credits：0';
courseListContainer.before(totalCreditsDisplay); 

// 3. Core function: Rendering courses to pages
function renderCourses(courseArray) {
    // Clear existing content
    courseListContainer.innerHTML = '';
    
    // If the passed array is empty, display a prompt
    if (courseArray.length === 0) {
        courseListContainer.innerHTML = '<p>Not found</p>';
        updateTotalCredits(0); // Update total credits to 0
        return;
    }

    // Calculate total credits and update display
    updateTotalCredits(courseArray);

    // Iterate over the array and generate HTML
    courseArray.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // due to attribution of "isCompleted" add CSS class
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        
        courseCard.innerHTML = `
            
            <div class="course-info">
                <h3 class="course-title">${course.subject} <span class="course-number">${course.number}</span></h3>
                                
            </div>
        `;
        courseListContainer.appendChild(courseCard);
    });
}

// 4. calculate total credits
function updateTotalCredits(courseArray) {
    // use reduce() method
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + course.credits;
    }, 0); // initial value 0
    
    // Renew page content
    totalCreditsDisplay.textContent = `The total credits for course listed is ${totalCredits}`;
}

// 5. Event listener: When the button is clicked, the corresponding filtering logic is executed
showAllBtn.addEventListener('click', () => {
    renderCourses(courses); // show all courses
});

showWDDBtn.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(filteredCourses);
});

showCSEBtn.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(filteredCourses);
});

// 6. Initial load: When the page loads, all courses are displayed first
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
});

// 7. Use dialog to show course details
let courseDetails = document.getElementById('course-details');

function displayCourseDetails(course) {
    // clear courseDetails element
    courseDetails.innerHTML = '';
    // Due to the technology is an Array, we use joun(',') method to let the element and space to connect to be a single string
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();
  
    closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

