import { onDataFeedPane } from '../support/page_objects/dataFeedPane';
import { onCurrentViewPane } from '../support/page_objects/currentViewPane';
import { setRouteAliases } from '../helpers/index';
import { feeds } from '../fixtures/data';
   
   

Cypress.on('window:before:load', win => {
    delete win.fetch;
  });


  describe('Share feed', () => {

    beforeEach('Set Route Aliases', () => setRouteAliases());
  
    it('Login to the app as User1', () => {         
        cy.loginToApplication('user1');
    });

    it("Delete all previous feeds", () => {
        onDataFeedPane.deleteAllFeeds();
    })
    
    it ('Load 3 feeds', () => {       
        onDataFeedPane.clickToOpenCurrentViewPane();
        feeds.map( name => {              
            onDataFeedPane.uploadFeed(name)
            onDataFeedPane.verifyFeedNameAndCreationDate(name)                       
            onCurrentViewPane.verifyThatFeedPresentOnCurrentViewPane(name);
            onCurrentViewPane.verifyThatFeedIsAddedtoMap(name);                     
        })      
    })

    it ('Sort tasks and verify correctness of sorting', () => {
        onDataFeedPane.uncheckFeed(feeds[2]) 
        onDataFeedPane.sotFeeds('name,asc')
        onDataFeedPane.verifySorting(feeds, [2,0,1])
        onDataFeedPane.sotFeeds('Mapped Feeds')   
        onDataFeedPane.verifySorting(feeds, [0,1,2]) 
        onDataFeedPane.sotFeeds('name,desc')
        onDataFeedPane.verifySorting(feeds, [0,2,1])
        onDataFeedPane.sotFeeds('created_at')
        onDataFeedPane.verifySorting(feeds, [0,1,2])
           
    } )


    it ('Share 3 feeds with User2', () => {
        feeds.map( name => {
            onDataFeedPane.shareFeed(name)
        })
    })


    it ('Login as User2', () => {
        cy.logoutFromApplication();
        cy.loginToApplication('user2');
    })


    it('Verify new shared feed notifications', () => {
        feeds.map( name => {               
            onDataFeedPane.verifySharedFeedNotifications(name)            
        })           
    })


    it('Verify shared feeds', () => {
        feeds.map( name => { 
            onDataFeedPane.verifySharedFeeds(name)
        })
    })


    it('Verify Feeds on the current view pane', () => {
        onDataFeedPane.clickToOpenCurrentViewPane();
        feeds.map( name => { 
            onCurrentViewPane.verifyThatFeedPresentOnCurrentViewPane(name);
            onCurrentViewPane.verifyThatFeedIsAddedtoMap(name);                
        })
      });


    it('Delete the 1st shared feed', () => {
        onDataFeedPane.deleteTheFeed(feeds[0]);
    })


    it ('Login as User 1', () => {
        cy.loginToApplication('user1');
    })


    it ('Verify that the feed No1 deleted by the user 2 still exists for the User 1', () => {
        onDataFeedPane.verifyFeedExistance(feeds[0], true)
    })


    it('Delete the 2nd feed and revoke the 3rd feed as User 1 and verify that the feeds were deleted from User2 account', () => {        
        onDataFeedPane.deleteTheFeed(feeds[1])
        onDataFeedPane.revokeFeed(feeds[2], 'exzeoatlasqa@gmail.com')
        onDataFeedPane.verifyFeedExistance(feeds[1], false)
        onDataFeedPane.verifyFeedExistance(feeds[2], true)
        cy.loginToApplication('user2')
        onDataFeedPane.verifyFeedExistance(feeds[1], false)
        onDataFeedPane.verifyFeedExistance(feeds[2], false)

    })

    it('Logout from the App', () => {
        cy.logoutFromApplication()
    }) 

})
  