// Micro-interaction for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.98)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Search bar focus interaction
const searchInput = document.querySelector('input[type="text"]');
if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('ring-2', 'ring-primary/20');
    });
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('ring-2', 'ring-primary/20');
    });
}

// Topic cards from Supabase, grouped by tech
const GITHUB_USERNAME = 'keshavkarn1976-bit';

function childRepoUrl(tech) {
    return `https://${GITHUB_USERNAME}.github.io/training-${tech.toLowerCase()}`;
}

function renderTopicCard(tech, group) {
    const card = document.createElement('div');
    card.className = 'bg-surface-container-lowest border border-outline-variant p-6 rounded-lg course-card-hover flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300';
    card.innerHTML = `
        <div class="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <h3 class="font-headline-md text-headline-md text-on-surface mb-2"></h3>
        <span class="font-label-sm text-label-sm bg-surface-container-high px-2 py-1 rounded text-on-surface-variant uppercase tracking-wider inline-block self-start"></span>
        <div class="flex flex-col gap-3 mt-6">
            <a class="w-full text-center bg-primary text-on-primary py-2.5 font-label-md text-label-md rounded hover:bg-primary-container transition-all" target="_blank" rel="noopener noreferrer"></a>
            <a class="w-full text-center bg-surface-container-lowest border border-outline text-on-surface py-2.5 font-label-md text-label-md rounded hover:bg-surface-container transition-all" target="_blank" rel="noopener noreferrer">View Courses</a>
        </div>
    `;
    const [visitLink, coursesLink] = card.querySelectorAll('a');

    card.querySelector('h3').textContent = tech;
    card.querySelector('span').textContent = `${group.count} Course${group.count === 1 ? '' : 's'} available`;

    visitLink.textContent = `Visit ${tech}`;
    visitLink.href = group.link;

    coursesLink.href = childRepoUrl(tech);

    return card;
}

function groupByTech(courses) {
    const groups = new Map();
    courses.forEach(course => {
        const tech = course.tech ?? 'Other';
        if (!groups.has(tech)) {
            groups.set(tech, { count: 0, link: course.link ?? '#' });
        }
        groups.get(tech).count += 1;
    });
    return groups;
}

async function loadCourses() {
    const courseGrid = document.getElementById('courseGrid');
    if (!courseGrid || !window.supabaseClient) return;

    const { data, error } = await window.supabaseClient
        .from('trainingdata')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        courseGrid.innerHTML = `<p class="font-body-md text-body-md text-on-surface-variant">Failed to load courses: ${error.message}</p>`;
        return;
    }

    const groups = groupByTech(data);

    courseGrid.innerHTML = '';
    groups.forEach((group, tech) => courseGrid.appendChild(renderTopicCard(tech, group)));
}

loadCourses();
