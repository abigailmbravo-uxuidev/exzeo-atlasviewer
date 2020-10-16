export class FeedPane {
  verifyThatUploadWindowIsNotPresented() {
    cy.get('.card').should('not.exist');
  }

  uploadFeed(feedName) {
    const fileName = 'TestFile.csv';
    cy.get('button')
      .contains('Upload')
      .first()
      .click(10, 10, { force: true });
    cy.get('.card').should('exist');
    cy.fixture(fileName).then(fileContent => {
      cy.get('#feed').upload({
        fileContent,
        fileName,
        mimeType: 'text/csv'
      });
    });
    cy.get('#feedname')
      .clear()
      .type(feedName);
    cy.get('button[type = "submit"]').click();
    cy.wait('@uploadFeed').then( response => {
      expect(response.xhr.status).to.equal(200);
    })   
  }

  verifyFeedNameAndCreationDate(name) {
    let date = new Date();
    let formDate = date
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
      .split('/')
      .join('-');    
    cy.contains(name)
      .parents('li')
      .find('dd')
      .first()
      .should('have.text', formDate);
    cy.contains(name)      
      .parents('li')
      .find('dd')
      .last();   
  }
  
  uncheckFeed(name) {
    cy.contains(name)    
      .parents('li')
      .find('input')
      .uncheck()      
  }

  sortFeeds(type) {
    cy.get('.section.feeds').find('select').select(type)
  }

  verifySorting(feeds, order){
    feeds.map( ( feed, index ) => {
      cy.get('.file-name').eq(order[index]).should('have.text', feed)
    })
  }

  verifyThatFeedIsChecked(name) {
    cy.contains(name)    
      .parents('li')
      .find('input')
      .should('be.checked');
  }

  deleteAllFeeds() {
    cy.wait('@getUserData').then( data => {
      if ((data.response.body.data.feeds).length > 0) {
        cy.get('.file-name').each( () => {
          cy.get('.file-name')      
            .siblings('.menuIcon')
            .parents('li')
            .contains('Delete')
            .click({ force: true });
        cy.contains('Confirm Delete').click();
        cy.wait('@deleteTheFeed').then( response => {
            expect(response.xhr.status).to.equal(200)
          })
        })
      }
    })      
  }

  deleteTheFeed(name) {    
    cy.get('.file-name')
      .contains(name)
      .siblings('.menuIcon')
      .parents('li')
      .contains('Delete')
      .click({ force: true });
    cy.contains('Confirm Delete').click();
    cy.wait('@deleteTheFeed').then( response => {
      expect(response.xhr.status).to.equal(200)
    })
    cy.get('.panel-list.scroll').first().within( () => {
      cy.contains(name).should('not.exist')
    })
  }

  verifyFeedExistance(name, exist) {
    let ex = exist === true ? 'exist' : 'not.exist'
    cy.get('.file-name')
      .contains(name)
      .should(ex)    
  }

  shareFeed(name) {
    cy.contains(name).first().parents('h5').find('button').contains('Share').click({force:true})
    cy.wait('@shareFeedModal').then( response => {
      expect(response.xhr.status).to.equal(200)
    })
    cy.get("#recipients").type('exzeoatlasqa@gmail.com');          
    cy.get("[data-icon='plus']").click();
    cy.contains('exzeoatlasqa@gmail.com');
    cy.get("[class='card share']").find('button').contains('Share').click();
    cy.get('td').contains('exzeoatlasqa@gmail.com');
    cy.get("[data-icon='times']").click();
    cy.get("[class='card share']").should('not.exist');
    cy.wait('@shareFeed').then( response => {
      expect(response.xhr.status).to.equal(200)
    })
  }

  revokeFeed(name, email) {
    cy.contains(name).first().parents('h5').find('button').contains('Share').click({force:true});
    cy.get('[title*="Toggle A"]').uncheck();
    cy.contains(email).siblings('[role="cell"]').find('[title*="Toggle R"]').check();
    cy.contains('Revoke selected').click();   
    cy.get('.iconBtn').click();
    cy.wait('@revokeFeed').then( response => {
      expect(response.xhr.status).to.equal(200)
    })
  }

  verifySharedFeedNotifications(name) {
     cy.get('.feed-name').contains(name).siblings('header').contains('New Shared Feed')
     cy.get('.feed-name').contains(name).siblings('header').find('[role="img"]')
     cy.get('.feed-name').contains(name).parent('.notification-content').siblings('button').click()
     cy.get('.feed-notification').within(() => {
       cy.contains(name).should('not.exist')
     })
   
  }

  verifySharedFeeds(name) {
     cy.get('.file-name').contains(name).parents('span').siblings('span').find('input').should('not.be.checked');
     cy.get('.file-name').contains(name).parents('span').siblings('span').find('input').check()
     cy.get('.file-name').contains(name).siblings('.menuIcon').trigger('pointerenter')

  }

  clickToOpenCurrentViewPane() {
    cy.get('[class*="view-tab"]').click();
  }
}

export const onDataFeedPane = new FeedPane();
