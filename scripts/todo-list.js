class TodoList {
    constructor() {
        this.lists = {
            'Holiday Destinations': [],
            'Movies to Watch': [],
            'Music Recommendations': [],
            'Date Ideas': []
        };
        
        // Load saved lists from localStorage if available
        this.loadLists();
        
        // DOM elements
        this.todoContainer = document.createElement('div');
        this.todoContainer.className = 'todo-container';
        this.todoContainer.innerHTML = `
            <div class="todo-header">
                <h2>Our Lists</h2>
                <button id="closeTodoBtn" class="close-btn">×</button>
            </div>
            <div class="todo-content">
                <div class="category-selector">
                    <select id="categorySelect">
                        ${Object.keys(this.lists).map(category => 
                            `<option value="${category}">${category}</option>`
                        ).join('')}
                    </select>
                    <button id="addCategoryBtn" class="add-btn">+ Add Category</button>
                </div>
                <div class="todo-list">
                    <ul id="todoItems"></ul>
                </div>
                <div class="todo-input">
                    <input type="text" id="newItemInput" placeholder="Add new item...">
                    <button id="addItemBtn" class="add-btn">+</button>
                </div>
            </div>
        `;
        
        // Append to document body but hide initially
        document.body.appendChild(this.todoContainer);
        this.todoContainer.style.display = 'none';
        
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.id = 'todoToggleBtn';
        this.toggleButton.className = 'todo-toggle-btn';
        this.toggleButton.innerHTML = '📝 Our Lists';
        document.body.appendChild(this.toggleButton);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial render
        this.renderCurrentList();
    }
    
    setupEventListeners() {
        // Toggle button click
        this.toggleButton.addEventListener('click', () => {
            this.toggleTodoContainer();
        });
        
        // Close button click
        document.getElementById('closeTodoBtn').addEventListener('click', () => {
            this.todoContainer.style.display = 'none';
        });
        
        // Category select change
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            this.renderCurrentList();
        });
        
        // Add item button click
        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.addNewItem();
        });
        
        // Enter key press in input
        document.getElementById('newItemInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewItem();
            }
        });
        
        // Add category button click
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            const newCategory = prompt('Enter new category name:');
            if (newCategory && newCategory.trim() !== '') {
                if (!this.lists[newCategory]) {
                    this.lists[newCategory] = [];
                    this.saveLists();
                    this.updateCategorySelect();
                    document.getElementById('categorySelect').value = newCategory;
                    this.renderCurrentList();
                }
            }
        });
    }
    
    toggleTodoContainer() {
        if (this.todoContainer.style.display === 'none') {
            this.todoContainer.style.display = 'block';
        } else {
            this.todoContainer.style.display = 'none';
        }
    }
    
    getCurrentCategory() {
        return document.getElementById('categorySelect').value;
    }
    
    addNewItem() {
        const input = document.getElementById('newItemInput');
        const text = input.value.trim();
        
        if (text !== '') {
            const currentCategory = this.getCurrentCategory();
            this.lists[currentCategory].push({
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            });
            
            this.saveLists();
            this.renderCurrentList();
            input.value = '';
        }
    }
    
    toggleItemCompletion(itemIndex, category) {
        this.lists[category][itemIndex].completed = !this.lists[category][itemIndex].completed;
        this.saveLists();
        this.renderCurrentList();
    }
    
    deleteItem(itemIndex, category) {
        this.lists[category].splice(itemIndex, 1);
        this.saveLists();
        this.renderCurrentList();
    }
    
    renderCurrentList() {
        const category = this.getCurrentCategory();
        const items = this.lists[category] || [];
        const todoList = document.getElementById('todoItems');
        
        todoList.innerHTML = '';
        
        if (items.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-list-message';
            emptyMessage.textContent = `No items in "${category}" yet`;
            todoList.appendChild(emptyMessage);
            return;
        }
        
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (item.completed) {
                li.classList.add('completed');
            }
            
            li.innerHTML = `
                <div class="todo-item-content">
                    <input type="checkbox" ${item.completed ? 'checked' : ''}>
                    <span class="todo-text">${item.text}</span>
                </div>
                <button class="delete-btn">×</button>
            `;
            
            // Checkbox click
            li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
                this.toggleItemCompletion(index, category);
            });
            
            // Delete button click
            li.querySelector('.delete-btn').addEventListener('click', () => {
                this.deleteItem(index, category);
            });
            
            todoList.appendChild(li);
        });
    }
    
    updateCategorySelect() {
        const select = document.getElementById('categorySelect');
        select.innerHTML = Object.keys(this.lists).map(category => 
            `<option value="${category}">${category}</option>`
        ).join('');
    }
    
    saveLists() {
        localStorage.setItem('ourLists', JSON.stringify(this.lists));
    }
    
    loadLists() {
        const savedLists = localStorage.getItem('ourLists');
        if (savedLists) {
            this.lists = JSON.parse(savedLists);
        }
    }
}