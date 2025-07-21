describe('FEATURE: Homepage Welcome Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: The page loads', () => {
      describe('SCENARIO: Page displays correctly', () => {
        it('THEN: Should display the welcome title', () => {
          cy.get('h1').should('contain.text', 'Welcome!')
        })

        it('THEN: Should display the name input field', () => {
          cy.get('input[type="text"]').should('be.visible')
          cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Your name')
        })

        it('THEN: Should display the continue button', () => {
          cy.get('button[type="submit"]').should('be.visible')
          cy.get('button[type="submit"]').should('contain.text', 'Continue')
        })

        it('THEN: Should display the tech stack section', () => {
          cy.get('h2').should('contain.text', 'Built with Modern Tech Stack')
        })

        it('THEN: Should display all four tech stack cards', () => {
          cy.get('.grid > div').should('have.length', 4)
        })

        it('THEN: Should display Vue.js card', () => {
          cy.contains('Vue.js 3').should('be.visible')
        })

        it('THEN: Should display Nuxt 3 card', () => {
          cy.contains('Nuxt 3').should('be.visible')
        })

        it('THEN: Should display Pinia card', () => {
          cy.contains('Pinia').should('be.visible')
        })

        it('THEN: Should display Tailwind card', () => {
          cy.contains('Tailwind').should('be.visible')
        })

        it('THEN: Should display author section', () => {
          cy.get('h2').should('contain.text', 'Developed by André Drumond')
        })

        it('THEN: Should display social media links', () => {
          cy.contains('GitHub').should('be.visible')
          cy.contains('LinkedIn').should('be.visible')
          cy.contains('YouTube').should('be.visible')
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User enters a valid name', () => {
      describe('SCENARIO: Form submission with valid data', () => {
        it('THEN: Should accept the name input', () => {
          const testName: string = 'John Doe'
          cy.get('input[type="text"]').type(testName)
          cy.get('input[type="text"]').should('have.value', testName)
        })

        it('THEN: Should not show error message', () => {
          const testName: string = 'John Doe'
          cy.get('input[type="text"]').type(testName)
          cy.get('button[type="submit"]').click()
          cy.get('.text-red-500').should('not.exist')
        })

        it('THEN: Should navigate to todos page after submission', () => {
          const testName: string = 'John Doe'
          cy.get('input[type="text"]').type(testName)
          cy.get('button[type="submit"]').click()
          cy.url().should('include', '/todos')
        })

        it('THEN: Should save name to localStorage', () => {
          const testName: string = 'John Doe'
          cy.get('input[type="text"]').type(testName)
          cy.get('button[type="submit"]').click()
          cy.window().its('localStorage').invoke('getItem', 'user_name').should('eq', testName)
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User submits form without entering name', () => {
      describe('SCENARIO: Form validation for empty input', () => {
        it('THEN: Should not navigate to todos page', () => {
          cy.get('button[type="submit"]').click()
          cy.url().should('not.include', '/todos')
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User enters only whitespace', () => {
      describe('SCENARIO: Form validation for whitespace-only input', () => {
        it('THEN: Should show error message', () => {
          cy.get('input[type="text"]').type('   ')
          cy.get('button[type="submit"]').click()
          cy.get('.text-red-500').should('contain.text', 'Please enter your name.')
        })

        it('THEN: Should not navigate to todos page', () => {
          cy.get('input[type="text"]').type('   ')
          cy.get('button[type="submit"]').click()
          cy.url().should('not.include', '/todos')
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User has previously entered a name', () => {
      describe('SCENARIO: Form pre-population from localStorage', () => {
        it('THEN: Should pre-populate the input field', () => {
          const testName: string = 'Jane Smith'
          cy.window().its('localStorage').invoke('setItem', 'user_name', testName)
          cy.reload()
          cy.get('input[type="text"]').should('have.value', testName)
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User clicks on social media links', () => {
      describe('SCENARIO: External link functionality', () => {
        it('THEN: GitHub link should open in new tab', () => {
          cy.get('a[href*="github.com"]').should('have.attr', 'target', '_blank')
          cy.get('a[href*="github.com"]').should('have.attr', 'rel', 'noopener noreferrer')
        })

        it('THEN: LinkedIn link should open in new tab', () => {
          cy.get('a[href*="linkedin.com"]').should('have.attr', 'target', '_blank')
          cy.get('a[href*="linkedin.com"]').should('have.attr', 'rel', 'noopener noreferrer')
        })

        it('THEN: YouTube link should open in new tab', () => {
          cy.get('a[href*="youtube.com"]').should('have.attr', 'target', '_blank')
          cy.get('a[href*="youtube.com"]').should('have.attr', 'rel', 'noopener noreferrer')
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: User interacts with form elements', () => {
      describe('SCENARIO: Form element interactions', () => {
        it('THEN: Input field should be focused when clicked', () => {
          cy.get('input[type="text"]').click()
          cy.get('input[type="text"]').should('be.focused')
        })

        it('THEN: Input field should be required', () => {
          cy.get('input[type="text"]').should('have.attr', 'required')
        })

        it('THEN: Button should have proper styling classes', () => {
          cy.get('button[type="submit"]').should('have.class', 'bg-purple-600')
          cy.get('button[type="submit"]').should('have.class', 'hover:bg-purple-700')
        })
      })
    })
  })

  describe('GIVEN: User is on the homepage', () => {
    describe('WHEN: Page animations are triggered', () => {
      describe('SCENARIO: Visual animations and styling', () => {
        it('THEN: Main card should have fade-in animation', () => {
          cy.get('.animate-fade-in').should('be.visible')
        })

        it('THEN: Tech stack cards should have gradient backgrounds', () => {
          cy.get('.grid > div').first().should('have.class', 'bg-gradient-to-br')
        })
      })
    })
  })
}) 