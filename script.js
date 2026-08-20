 // Lahore Solutions Hub - Complete Logic

// Data Store
const dataStore = {
    issues: [
        {
            id: 1,
            title: "Water Scarcity in Gulberg",
            category: "Infrastructure",
            location: "Gulberg",
            description: "Severe water shortage affecting residents for over 2 weeks. Tankers are irregular.",
            priority: 9,
            votes: 145,
            date: "2026-07-10",
            solved: false,
            reporter: "Ahmed R."
        },
        {
            id: 2,
            title: "School Building Collapse Risk",
            category: "Education",
            location: "Mughalpura",
            description: "Government school building showing structural cracks. Children at risk.",
            priority: 8,
            votes: 98,
            date: "2026-07-15",
            solved: false,
            reporter: "Fatima A."
        },
        {
            id: 3,
            title: "Air Quality Hazardous in Lahore",
            category: "Environment",
            location: "Gulshan-e-Ravi",
            description: "AQI crossing 300+ daily. Residents suffering from respiratory issues.",
            priority: 7,
            votes: 210,
            date: "2026-07-18",
            solved: false,
            reporter: "Usman K."
        },
        {
            id: 4,
            title: "Traffic Congestion at Liberty",
            category: "Traffic",
            location: "Liberty Market",
            description: "Hours of traffic jams daily. No traffic wardens during peak hours.",
            priority: 9,
            votes: 320,
            date: "2026-07-05",
            solved: false,
            reporter: "Sara M."
        },
        {
            id: 5,
            title: "Healthcare Staff Shortage",
            category: "Healthcare",
            location: "Shadman",
            description: "Mayo Hospital satellite center lacks doctors and medicines.",
            priority: 8,
            votes: 76,
            date: "2026-07-20",
            solved: false,
            reporter: "Dr. Khalid"
        },
        {
            id: 6,
            title: "Waste Accumulation in Johar Town",
            category: "Waste Management",
            location: "Johar Town",
            description: "Garbage not collected for 5 days. Health hazard for residents.",
            priority: 7,
            votes: 134,
            date: "2026-07-22",
            solved: false,
            reporter: "Ali H."
        }
    ],
    solutions: [
        {
            id: 101,
            title: "Rainwater Harvesting for Lahore",
            category: "Infrastructure",
            description: "Implement mandatory rainwater harvesting systems in all new constructions and retrofit existing buildings.",
            votes: 82,
            proposedBy: "Green Lahore Initiative"
        },
        {
            id: 102,
            title: "School Rehabilitation Program",
            category: "Education",
            description: "Use provincial funds to rehabilitate 50+ government schools in Lahore with modern facilities.",
            votes: 65,
            proposedBy: "Teach for Pakistan"
        },
        {
            id: 103,
            title: "Electric Bus Rapid Transit System",
            category: "Environment",
            description: "Launch electric BRT system to reduce smog and traffic congestion in Lahore.",
            votes: 93,
            proposedBy: "Clean Air Lahore"
        },
        {
            id: 104,
            title: "Smart Traffic Management System",
            category: "Traffic",
            description: "Install AI-powered traffic lights and CCTV monitoring for real-time traffic management.",
            votes: 110,
            proposedBy: "Lahore Smart City"
        },
        {
            id: 105,
            title: "Mobile Health Clinics",
            category: "Healthcare",
            description: "Deploy mobile health units to underserved areas of Lahore for basic medical care.",
            votes: 57,
            proposedBy: "Health for All"
        },
        {
            id: 106,
            title: "Community Waste Management Program",
            category: "Waste Management",
            description: "Establish neighborhood waste segregation and composting programs.",
            votes: 44,
            proposedBy: "Clean Lahore Community"
        }
    ],
    feedbacks: [
        {
            id: 1,
            text: "The water issue in Gulberg is getting worse. We need immediate action!",
            author: "Ali R.",
            date: "2026-07-23",
            issueId: 1
        },
        {
            id: 2,
            text: "Great initiative! I've seen similar programs work in Turkey.",
            author: "Zara K.",
            date: "2026-07-24",
            issueId: 3
        },
        {
            id: 3,
            text: "The traffic at Liberty needs roundabouts, not just signals.",
            author: "Imran S.",
            date: "2026-07-25",
            issueId: 4
        }
    ],
    nextIssueId: 7,
    nextSolutionId: 107,
    nextFeedbackId: 4,
    communityMembers: 156,
    communityFeedback: 42,
    communitySolutions: 28
};

// DOM references
const tabs = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const issueListEl = document.getElementById('issueList');
const totalIssuesEl = document.getElementById('totalIssues');
const activeSolutionsEl = document.getElementById('activeSolutions');
const mostUrgentEl = document.getElementById('mostUrgent');
const totalVotesEl = document.getElementById('totalVotes');
const totalFeedbackEl = document.getElementById('totalFeedback');
const issueForm = document.getElementById('issueForm');
const solutionsListEl = document.getElementById('solutionsList');
const filterBtns = document.querySelectorAll('.filter-btn');
const feedbackListEl = document.getElementById('feedbackList');
const feedbackForm = document.getElementById('feedbackForm');
const votingOptionsEl = document.getElementById('votingOptions');

// Chart instances
let priorityChart = null;
let solutionsChart = null;

// ---------- UI Functions ----------
function renderDashboard() {
    // Stats
    const total = dataStore.issues.length;
    const solutions = dataStore.solutions.length;
    const totalVotes = dataStore.issues.reduce((sum, i) => sum + i.votes, 0);
    const mostUrgent = dataStore.issues.length > 0 
        ? dataStore.issues.reduce((a, b) => a.priority > b.priority ? a : b).title 
        : 'N/A';

    totalIssuesEl.textContent = total;
    activeSolutionsEl.textContent = solutions;
    mostUrgentEl.textContent = mostUrgent;
    totalVotesEl.textContent = totalVotes;
    totalFeedbackEl.textContent = dataStore.feedbacks.length;

    // Top issues list with vote buttons
    const sorted = [...dataStore.issues].sort((a, b) => b.priority - a.priority).slice(0, 8);
    issueListEl.innerHTML = sorted.map(issue => {
        const priorityClass = issue.priority >= 8 ? 'priority-high' : issue.priority >= 5 ? 'priority-medium' : 'priority-low';
        return `<li>
            <span class="issue-title">${issue.title}</span>
            <span class="issue-meta">
                <span>📍 ${issue.location}</span>
                <span>${issue.category}</span>
                <span class="issue-priority ${priorityClass}">P${issue.priority}</span>
                <span>👍 ${issue.votes}</span>
                <button class="vote-btn" onclick="voteIssue(${issue.id})">Vote</button>
            </span>
        </li>`;
    }).join('');

    // Priority Chart
    const categories = ['Infrastructure', 'Education', 'Healthcare', 'Economy', 'Environment', 'Security', 'Traffic', 'Waste Management', 'Governance'];
    const counts = categories.map(cat => 
        dataStore.issues.filter(i => i.category === cat).length
    );

    const ctx = document.getElementById('priorityChart').getContext('2d');
    if (priorityChart) priorityChart.destroy();
    priorityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Issues by Category',
                data: counts,
                backgroundColor: ['#1a3a5c', '#2d6a4f', '#e67e22', '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#f39c12', '#2c3e50'],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // Solutions Chart
    const solCategories = ['Infrastructure', 'Education', 'Healthcare', 'Economy', 'Environment', 'Security', 'Traffic', 'Waste Management'];
    const solCounts = solCategories.map(cat => 
        dataStore.solutions.filter(s => s.category === cat).length
    );

    const ctx2 = document.getElementById('solutionsChart').getContext('2d');
    if (solutionsChart) solutionsChart.destroy();
    solutionsChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: solCategories,
            datasets: [{
                data: solCounts,
                backgroundColor: ['#1a3a5c', '#2d6a4f', '#e67e22', '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#f39c12'],
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Update About page stats
    document.getElementById('aboutIssues').textContent = total;
    document.getElementById('aboutVotes').textContent = totalVotes;
    document.getElementById('aboutSolutions').textContent = solutions;
    document.getElementById('aboutFeedback').textContent = dataStore.feedbacks.length;
}

function renderSolutions(filter = 'all') {
    const filtered = filter === 'all' 
        ? dataStore.solutions 
        : dataStore.solutions.filter(s => s.category === filter);
    
    solutionsListEl.innerHTML = filtered.map(sol => `
        <div class="solution-card">
            <span class="solution-category">${sol.category}</span>
            <h3>${sol.title}</h3>
            <p>${sol.description}</p>
            <div class="solution-meta">
                <span>👤 ${sol.proposedBy}</span>
                <span>👍 ${sol.votes} votes</span>
                <button class="solution-vote-btn" onclick="voteSolution(${sol.id})">Vote</button>
            </div>
        </div>
    `).join('') || '<p style="grid-column:1/-1;text-align:center;color:#5a6b7e;padding:40px;">No solutions in this category yet. Be the first to propose one!</p>';
}

function renderFeedback() {
    feedbackListEl.innerHTML = dataStore.feedbacks.map(fb => `
        <div class="feedback-item">
            <div class="feedback-text">"${fb.text}"</div>
            <div class="feedback-meta">
                <span>👤 ${fb.author || 'Anonymous'}</span>
                <span>📅 ${fb.date}</span>
                ${fb.issueId ? `<span>📍 Issue #${fb.issueId}</span>` : ''}
            </div>
        </div>
    `).join('') || '<p style="text-align:center;color:#5a6b7e;padding:20px;">No feedback yet. Share your thoughts!</p>';
}

function renderVoting() {
    const topIssues = [...dataStore.issues].sort((a, b) => b.votes - a.votes).slice(0, 4);
    votingOptionsEl.innerHTML = topIssues.map(issue => `
        <div class="voting-option">
            <div class="vote-title">${issue.title}</div>
            <div class="vote-count">👍 ${issue.votes}</div>
            <button class="vote-action-btn" onclick="voteIssue(${issue.id})">Vote Now</button>
        </div>
    `).join('');
}

// ---------- Voting Functions ----------
function voteIssue(issueId) {
    const issue = dataStore.issues.find(i => i.id === issueId);
    if (issue) {
        issue.votes++;
        renderDashboard();
        renderVoting();
        showNotification('Vote recorded! Thank you for participating.');
    }
}

function voteSolution(solutionId) {
    const solution = dataStore.solutions.find(s => s.id === solutionId);
    if (solution) {
        solution.votes++;
        renderDashboard();
        renderSolutions(getActiveFilter());
        showNotification('Solution voted! Your voice matters.');
    }
}

// ---------- Notification ----------
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2d6a4f;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideUp 0.5s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.animation = 'slideDown 0.5s ease';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ---------- Event Handlers ----------
function switchTab(tabId) {
    tabs.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'solutions') renderSolutions(getActiveFilter());
    if (tabId === 'community') {
        renderFeedback();
        renderVoting();
    }
}

function getActiveFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
}

// Tab switching
tabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Filter solutions
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSolutions(btn.dataset.filter);
    });
});

// Issue Form submission
issueForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('issueTitle').value.trim();
    const category = document.getElementById('issueCategory').value;
    const location = document.getElementById('issueLocation').value.trim();
    const description = document.getElementById('issueDescription').value.trim();
    const priority = parseInt(document.getElementById('issuePriority').value);
    const suggestion = document.getElementById('issueSuggestion').value.trim();
    const reporter = document.getElementById('reporterName').value.trim() || 'Anonymous';

    if (!title || !category || !location || !description || isNaN(priority)) {
        alert('Please fill all required fields correctly.');
        return;
    }

    const newIssue = {
        id: dataStore.nextIssueId++,
        title,
        category,
        location,
        description,
        priority,
        votes: 0,
        date: new Date().toISOString().split('T')[0],
        solved: false,
        reporter
    };

    dataStore.issues.push(newIssue);

    // If user suggested a solution, add it as a new solution
    if (suggestion) {
        const newSolution = {
            id: dataStore.nextSolutionId++,
            title: `Solution for: ${title}`,
            category: category,
            description: suggestion,
            votes: 0,
            proposedBy: reporter
        };
        dataStore.solutions.push(newSolution);
    }

    issueForm.reset();
    document.getElementById('issuePriority').value = 5;
    showNotification('✅ Issue reported successfully! Your voice matters.');
    switchTab('dashboard');
});

// Feedback Form submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('feedbackText').value.trim();
    const name = document.getElementById('feedbackName').value.trim() || 'Anonymous';

    if (!text) {
        alert('Please write some feedback.');
        return;
    }

    const newFeedback = {
        id: dataStore.nextFeedbackId++,
        text: text,
        author: name,
        date: new Date().toISOString().split('T')[0],
        issueId: null
    };

    dataStore.feedbacks.push(newFeedback);
    dataStore.communityFeedback++;
    feedbackForm.reset();
    showNotification('💬 Feedback posted! Thank you for sharing.');
    renderFeedback();
});

// ---------- Init ----------
renderDashboard();
renderSolutions('all');
renderFeedback();
renderVoting();
switchTab('dashboard');

// Auto-refresh dashboard every 60 seconds
setInterval(() => {
    if (document.getElementById('dashboard').classList.contains('active')) {
        renderDashboard();
    }
}, 60000);

console.log('🏛️ Lahore Solutions Hub loaded successfully!');
console.log(`📊 ${dataStore.issues.length} issues, ${dataStore.solutions.length} solutions, ${dataStore.feedbacks.length} feedbacks`);