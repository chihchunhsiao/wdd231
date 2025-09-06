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

// 2. 獲取 HTML 元素
const courseListContainer = document.getElementById('course-list');
const showAllBtn = document.getElementById('showAll');
const showWDDBtn = document.getElementById('showWDD');
const showCSEBtn = document.getElementById('showCSE');

// 新增一個顯示總學分的元素
const totalCreditsDisplay = document.createElement('h3');
totalCreditsDisplay.id = 'total-credits-display';
totalCreditsDisplay.textContent = '總學分：0';
courseListContainer.before(totalCreditsDisplay); // 將其放在課程列表上方

// 3. 核心功能：渲染課程到頁面
function renderCourses(courseArray) {
    // 清空現有內容
    courseListContainer.innerHTML = '';
    
    // 如果傳入的陣列是空的，顯示提示
    if (courseArray.length === 0) {
        courseListContainer.innerHTML = '<p>沒有找到相關課程。</p>';
        updateTotalCredits(0); // 更新總學分為0
        return;
    }

    // 計算總學分並更新顯示
    updateTotalCredits(courseArray);

    // 遍歷陣列並生成 HTML
    courseArray.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // 根據 isCompleted 屬性添加 CSS class
        if (course.isCompleted) {
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

// 4. 新增功能：動態計算並顯示總學分
function updateTotalCredits(courseArray) {
    // 使用 reduce() 方法來計算總學分
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + course.credits;
    }, 0); // 初始值設為 0
    
    // 更新頁面上的文字
    totalCreditsDisplay.textContent = `The total credits for course listed is ${totalCredits}`;
}

// 5. 事件監聽器：當按鈕被點擊時，執行對應的篩選邏輯
showAllBtn.addEventListener('click', () => {
    renderCourses(courses); // 顯示所有課程
});

showWDDBtn.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(filteredCourses);
});

showCSEBtn.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(filteredCourses);
});

// 6. 初始載入：頁面載入時，先顯示所有課程
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
});