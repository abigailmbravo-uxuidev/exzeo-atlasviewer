/// <reference types="cypress" />
import { onDataFeedPane } from '../support/page_objects/dataFeedPane';
import { onCurrentViewPane } from '../support/page_objects/currentViewPane';
import { onLegendPopUp } from '../support/page_objects/legendPopUp';
import { onLayersSection } from '../support/page_objects/layersSection';
import { onMap } from '../support/page_objects/map';
import { setRouteAliases } from '../helpers/index';
import { feeds } from '../fixtures/data'

Cypress.on('window:before:load', win => {
  delete win.fetch;
});

describe('Happy Path', () => {
  beforeEach('Set Route Aliases', () => setRouteAliases());
  
  it('Login to the app', () => {
    cy.loginToApplication('user1');
  });

  it('Upload Feed and verify it on the Data Feed pane', () => {    
    onDataFeedPane.uploadFeed(feeds[0]);    
    onDataFeedPane.verifyThatUploadWindowIsNotPresented(feeds[0]);
    onDataFeedPane.verifyFeedNameAndCreationDate(feeds[0]);
    onDataFeedPane.verifyThatFeedIsChecked(feeds[0]);
  });

  it('Verify feeds on the map', () => {   
    onMap.verifyThatPinsArePresentAndClickable();
    onMap.verifyDataOnPopUp();    
  });

  it('Verify Feed on the current view pane', () => {
    onDataFeedPane.clickToOpenCurrentViewPane();
    onCurrentViewPane.verifyThatFeedPresentOnCurrentViewPane(feeds[0]);
    onCurrentViewPane.verifyThatFeedIsAddedtoMap(feeds[0]);
  });

  it('Verify the legend', () => {
    onCurrentViewPane.clickToOpenLegend();
    onLegendPopUp.verifyThatLegendHasCorrectFeedName(feeds[0]);
    onLegendPopUp.verifyThatLegendIsDraggable();
    onLegendPopUp.closeTheLegendAndVerifyThatItClosed();
  });

  it('Verify Layers Section', () => {
    onLayersSection.checkLayer();
    onCurrentViewPane.verifyThatLayerPresentAndHasCorrectName();
    onCurrentViewPane.verifyThatLayerIsDisplayedOnMap();
  });

  it('Verify Base Map selection', () => {
    onCurrentViewPane.verifyBaseMapLayer();
  }),
  
  it('Delete the feed', () => {
      onDataFeedPane.deleteTheFeed(feeds[0]);
    });

  it('Log out', () => {
    cy.logoutFromApplication();
  });
});
