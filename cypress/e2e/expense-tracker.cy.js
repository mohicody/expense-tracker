describe('Spend Smart App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()
    cy.visit('http://localhost:5173')
  })

  it('should display the app title', () => {
    cy.contains('h1', 'Spend Smart').should('be.visible')
  })

  it('should add a new expense', () => {
    const expense = {
      title: 'Test Expense',
      amount: '50',
      category: 'Food',
      date: '2025-01-27'
    }

    // Fill out the expense form
    cy.get('input[placeholder*="title"]').type(expense.title)
    cy.get('input[placeholder*="amount"]').type(expense.amount)
    cy.get('select').select(expense.category)
    cy.get('input[type="date"]').type(expense.date)
    cy.contains('button', 'Add Expense').click()

    // Verify expense was added
    cy.contains(expense.title).should('be.visible')
    cy.contains(`$${expense.amount}`).should('be.visible')
    cy.contains(expense.category).should('be.visible')
  })

  it('should search for expenses', () => {
    // Add test expense
    const expense = {
      title: 'Searchable Expense',
      amount: '30',
      category: 'Food',
      date: '2025-01-27'
    }

    // Add expense
    cy.get('input[placeholder*="title"]').type(expense.title)
    cy.get('input[placeholder*="amount"]').type(expense.amount)
    cy.get('select').select(expense.category)
    cy.get('input[type="date"]').type(expense.date)
    cy.contains('button', 'Add Expense').click()

    // Search for expense
    cy.get('input[placeholder*="Search"]').type('Searchable')
    cy.contains(expense.title).should('be.visible')
    
    // Clear search and verify all expenses shown
    cy.get('input[placeholder*="Search"]').clear()
  })

  it('should filter expenses by category', () => {
    // Add test expenses with different categories
    const expenses = [
      { title: 'Grocery Shopping', amount: '50', category: 'Food', date: '2025-01-27' },
      { title: 'Bus Ticket', amount: '30', category: 'Transportation', date: '2025-01-27' }
    ]

    // Add expenses
    expenses.forEach(expense => {
      cy.get('input[placeholder*="title"]').type(expense.title)
      cy.get('input[placeholder*="amount"]').type(expense.amount)
      cy.get('select').select(expense.category)
      cy.get('input[type="date"]').type(expense.date)
      cy.contains('button', 'Add Expense').click()
    })

    // Filter by Food category
    cy.get('select[data-testid="category-filter"]').select('Food')
    cy.contains('Grocery Shopping').should('be.visible')
    cy.contains('Bus Ticket').should('not.exist')
  })

  it('should update monthly budget', () => {
    // Click edit budget button
    cy.contains('Edit Budget').click()
    
    // Enter new budget
    cy.get('input[type="number"]').clear().type('1000')
    cy.contains('button', 'Save').click()

    // Verify budget updated
    cy.contains('$1,000.00').should('be.visible')
  })

  it('should delete an expense', () => {
    // Add test expense
    const expense = {
      title: 'Expense to Delete',
      amount: '25',
      category: 'Food',
      date: '2025-01-27'
    }

    // Add expense
    cy.get('input[placeholder*="title"]').type(expense.title)
    cy.get('input[placeholder*="amount"]').type(expense.amount)
    cy.get('select').select(expense.category)
    cy.get('input[type="date"]').type(expense.date)
    cy.contains('button', 'Add Expense').click()

    // Delete expense
    cy.contains(expense.title)
      .parent('tr')
      .find('button')
      .contains('Delete')
      .click()

    // Verify expense was deleted
    cy.contains(expense.title).should('not.exist')
  })
})
