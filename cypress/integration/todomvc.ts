describe('ToDoMVC', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('can add a new card', () => {
        cy.get('[placeholder="What needs to be done?"]').type('todo card 1').type('{enter}');
        cy.get('.todo-list > li').should('have.length', 1);
    });

    it('keeps saved cards', () => {
        const todo = [{
            id:"ab33ca33-ffde-402d-a6db-340f337b851f",title:"task1",completed:false
        }]
        localStorage.setItem('react-todos', JSON.stringify(todo));
        cy.reload();
        cy.get('.todo-list > li').should('have.length', 1);
    });
    
    it('can complete tasks', () => {
        const todo = [{
            id:"ab33ca43-ffae-302d-a6db-340f337b851f",title:"2",completed:false
        }]
        localStorage.setItem('react-todos', JSON.stringify(todo));
        cy.reload();
        cy.get('button.destroy').click({force: true});
        cy.get('.todo-list > li').should('have.length', 0);
    });

    it('Cards marked done are under completed', () => {    
        const todo = [{
            id:"ab33ca43-ffae-302d-a6db-340f337b851f",title:"3",completed:false
        }]
        cy.reload();
        localStorage.setItem('react-todos', JSON.stringify(todo));
        cy.get('.todo-list > li [type="checkbox"]').click();
        cy.get('.todo-count').should('contain.text', '0');
    }); 
})